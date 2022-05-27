const userService = require('../service/user-service');
const {validationResult} = require('express-validator');
const ApiError = require('../exceptions/api-error');

class UserController {
    async registration(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Ошибка при валидации'))
            }
            const {email, password, fullName} = req.body;
            const userData = await userService.registration(email, password, fullName);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.status(200).json({data: userData, message: "Аккаунт был успешно создан"});
        } catch (e) {
            res.status(e.status).json({message: e.message})
            next();
        }
    }

    async login(req, res, next) {
        try {
            const {email, password} = req.body;
            const userData = await userService.login(email, password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.status(200).json({data: userData, message: "Успешный вход в аккаунт"});
        } catch (e) {
            res.status(e.status).json({message: e.message})
            next();
        }
    }

    async logout(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const token = await userService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.status(200).json({data: token, message: "Успешный выход из аккаунта"});
        } catch (e) {
            res.status(e.status).json({message: e.message})
            next();
        }
    }

    async activate(req, res, next) {
        try {
            const {activationCode, email} = req.body;
            console.log(activationCode)
            await userService.activate(activationCode, email);
            return res.status(200).json({message: `Email ${email} успешно активирован`});
        } catch (e) {
            res.status(e.status).json({message: e.message})
            next();
        }
    }

    async refresh(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const userData = await userService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json({data: userData});
        } catch (e) {
            res.status(e.status).json({message: e.message})
            next();
        }
    }
}


module.exports = new UserController();
