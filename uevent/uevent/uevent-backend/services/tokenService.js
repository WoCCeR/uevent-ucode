const jwt = require('jsonwebtoken')
const Token = require('../models/Tokens');

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET_KEY, {expiresIn:'7m'});
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET_KEY, {expiresIn:'7d'});
        return {
            accessToken,
            refreshToken
        };
    }

    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET_KEY);
            return userData;
        } catch (e){
            return null;
        }
    }

    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET_KEY);
            return userData;
        } catch (e){
            return null;
        }
    }

    async findTokenInDB(token, sessionId) {
        const result = await Token.findOne({ where: { refresh_token: token, session_id: sessionId } });
        return result;
    }


    async saveToken(userId, refreshToken, sessionId) {
        const tokenData = await Token.findOne({
            where: {
                user_id: userId,
                session_id: sessionId
            }
        });
        if (tokenData) {
            tokenData.refresh_token = refreshToken;
            const res = await tokenData.save();
            return res;
        }
        const token = await Token.create({ user_id: userId, session_id: sessionId, refresh_token: refreshToken });
        return token;
    }


    async removeToken(refreshToken, sessionId) {
        const deletedToken = await Token.destroy({ where: { refresh_token: refreshToken, session_id: sessionId } });
        return deletedToken;
    }

}

module.exports = new TokenService()