const JWT = require('jsonwebtoken');
const createError = require('http-errors');

const User = require('../Models/authModel');

module.exports = {
    // Giving token to the user
    signAccessToken: (UserId) => {
        return new Promise((resolve, reject) => {
            const payload = {};
            const secret = process.env.ACCESS_TOKEN_SECRET;
            const options = {
                expiresIn: '10m',
                issuer: 'DeeTechCoder.com',
                audience: UserId,
            };
            JWT.sign(payload, secret, options, (error, token) => {
                if (error) {
                    console.log(error.message);
                    reject(createError.InternalServerError());
                }
                resolve(token);
            });
        });
    },

    // Middleware to verify access token
    verifyAccessToken: (req, res, next) => {
        const authHeader = req.headers['authorization'];
        if (!authHeader) {
            return next(createError.Unauthorized('Authorization header missing'));
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            return next(createError.Unauthorized('Token missing from Authorization header'));
        }

        JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
            if (err) return next(createError.Unauthorized('Invalid token'));

            req.payload = payload;
            next();
        });
    },

    verifyRefreshToken: (refreshToken) => {
        return new Promise((resolve, reject) => {
            JWT.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, payload) => {
                if (err) {
                    return reject(createError.Unauthorized());
                }
                const userId = payload.aud; // Corrected `payId` to `payload`
                resolve(userId);
            });
        });
    }
};
