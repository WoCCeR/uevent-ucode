const authService = require("../services/authService");
const {validationResult} = require('express-validator');
const ApiError = require('../exceptions/apiError');


class AuthController {
    async registration(req, res, next) {
        try {
            const {firstName, surname, password, email} = req.body;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.badRequest('Validation error', errors.array()));
            }
            const userData = await authService.registration(firstName, surname, password, email);
            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 15 * 24 * 60 * 60 * 1000,
                secure: true,
                httpOnly: true
            });
            return res.json(userData);
        } catch(e) {
            next(e);
        }
    }

    async activate(req, res, next) {
        try {
            const activationLink = req.params.link;
            await authService.activate(activationLink);

            return res.redirect(process.env.CLIENT_URL);
        } catch (e) {
            next(e);
        }
    }

    async login(req, res, next) {
        try {
            const {email, password} = req.body;
            const userData = await authService.login(email, password);
            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 15 * 24 * 60 * 60 * 1000,
                secure: true,
                httpOnly: true
            });
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async logout(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const sessionId = req.user.sessionId;
            const token = await authService.logout(refreshToken, sessionId);
            res.clearCookie('refreshToken');
            res.status(200).json({ message: 'Logout successfully' });
        } catch (e) {
            next(e);
        }
    }

    async refresh(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const userData = await authService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 15 * 24 * 60 * 60 * 1000,
                secure: true,
                httpOnly: true
            });
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async passwordResetEmailSend(req, res, next) {
        try{
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.badRequest('Validation error', errors.array()));
            }

            const email = req.body.email;
            await authService.passwordResetEmailSend(email);
            res.status(200).json({ message: 'Password-reset email sent successfully' });
        } catch(e) {
            next(e);
        }
    }

    async passwordReset(req, res, next) {
        try{
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.badRequest('Validation error', errors.array()));
            }

            const resetLink = req.params.link;
            const newPassword = req.body.newPassword;
            await authService.passwordReset(resetLink, newPassword);
            res.status(200).json({ message: 'Password was successfully changed' });
        } catch(e) {
            next(e);
        }
    }

}

module.exports = new AuthController();