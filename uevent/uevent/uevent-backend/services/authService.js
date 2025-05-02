const User = require('../models/User');
const UserDto = require('../dtos/UserDto');
const Links = require('../models/Links');
const ApiError = require('../exceptions/apiError');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const mailService = require('../services/mailService');
const tokenService = require('../services/tokenService');

class AuthService {

    async registration(firstName, surname, password, email) {
        const candidateEmail = await User.findOne({ where: { email: email } });

        if (candidateEmail) {
            throw ApiError.badRequest(`User with ${email} is already exist.`);
        }

        const hashPassword = await bcrypt.hash(password, 3);
        const activationLink = uuid.v4();
        const user = await User.create({
            first_name: firstName,
            surname: surname,
            password: hashPassword,
            email: email
        });

        await Links.create({
            user_id: user.id,
            activate_link: activationLink
        });

        await mailService.sendActivationLink(`${process.env.API_URL}/api/auth/activate/${activationLink}`, email);

        const sessionId = uuid.v4();
        const userDto = new UserDto(user, sessionId);
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken, sessionId);

        return {
            ...tokens,
            user: userDto
        }
    }

    async activate(activationLink) {
        const link = await Links.findOne({ where: { activate_link: activationLink } });

        if (!link) {
            throw ApiError.badRequest("Incorrect activation link");
        }

        const user = await User.findByPk(link.user_id);

        if (!user) {
            throw ApiError.notFound("User not found");
        }

        user.email_confirmed = true;
        await user.save();
    }

    async login(email, password) {
        const user = await User.findOne({ where: { email: email } });
        if (!user) {
            throw ApiError.notFound('User with this email was not found');
        } else if (user.email_confirmed === false) {
            throw ApiError.forbidden('Email is not confirmed');
        }
        const isPassEquals = await bcrypt.compare(password, user.password);
        if(!isPassEquals) {
            throw ApiError.badRequest('Invalid password');
        }
        const sessionId = uuid.v4();
        const userDto = new UserDto(user, sessionId);
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken, sessionId);

        return {
            ...tokens,
            user: userDto
        }
    }

    async logout(refreshToken, sessionId) {
        const token = await tokenService.removeToken(refreshToken, sessionId);
        return token;
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.unauthorizedError()
        }
        const extractedUser = await tokenService.validateRefreshToken(refreshToken);
        const userData = tokenService.validateRefreshToken(refreshToken);

        if (!userData) {
            throw ApiError.unauthorizedError()
        }
        const user = await User.findOne({ where: { id: userData.id } });
        const userDto = new UserDto(user, extractedUser.sessionId);
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken, extractedUser.sessionId);

        return {
            ...tokens,
            user: userDto
        }

    }

    async passwordResetEmailSend(email) {
        const user = await User.findOne({ where: { email: email } });
        if(!user) {
            throw ApiError.badRequest('User with this email was not found');
        }
        const timestamp = Date.now();
        const resetLink = `${uuid.v4()}_${timestamp}`;
        const userLinks = await Links.findOne({ where: { user_id: user.id } });
        userLinks.reset_password_link = resetLink;
        await userLinks.save();
        await mailService.sendResetLink(`${process.env.API_URL}/api/auth/password-reset/${resetLink}`, email);
    }

    async passwordReset(resetLink, newPassword) {
        const parts = resetLink.split('_');
        const userLinks = await Links.findOne({ where: { reset_password_link: resetLink } });
        const user = await User.findByPk(userLinks.user_id);

        if (parts.length !== 2) {
            throw ApiError.badRequest("Invalid reset link format");
        }
        if (!userLinks) {
            throw ApiError.badRequest("Invalid reset link");
        }

        const timestamp = parseInt(parts[1]);
        const currentTime = Date.now();
        const expirationTime = timestamp + (5 * 60 * 1000);

        if (currentTime > expirationTime) {
            throw ApiError.badRequest("Password reset link has expired");
        }

        const hashPassword = await bcrypt.hash(newPassword, 3);
        user.password = hashPassword;
        userLinks.reset_password_link = null;
        await user.save();
        await userLinks.save();
    }
}

module.exports = new AuthService();