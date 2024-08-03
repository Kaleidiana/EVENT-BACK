const JWT = require('jsonwebtoken');
const createError = require('http-errors');

module.exports = {
    // Generating access token for the user
    signAccessToken: (userId) => {
        return new Promise((resolve, reject) => {
            const payload = {}; // You might want to include user-specific data here
            const secret = process.env.ACCESS_TOKEN_SECRET;
            if (!secret) return reject(createError.InternalServerError('Access token secret is not defined'));

            const options = {
                expiresIn: '10m',
                issuer: 'DeeTechCoder.com',
                audience: userId,
            };

            JWT.sign(payload, secret, options, (error, token) => {
                if (error) {
                    console.log(error.message);
                    return reject(createError.InternalServerError('Failed to sign access token'));
                }
                resolve(token);
            });
        });
    },

    // Middleware to verify access token
    verifyAccessToken: (req, res, next) => {
        const authHeader = req.headers['authorization'];
        if (!authHeader) return next(createError.Unauthorized('Authorization header missing'));

        const bearertoken = authHeader.split(' ');
        const token = bearertoken[1];
        if (!token) return next(createError.Unauthorized('Token missing'));

        JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
            if (err) {
                console.log(err.message);
                return next(createError.Unauthorized('Invalid access token'));
            }
            req.payload = payload;
            next();
        });
    },

    // Verifying refresh token
    verifyRefreshToken: (refreshToken) => {
        return new Promise((resolve, reject) => {
            const secret = process.env.REFRESH_TOKEN_SECRET;
            if (!secret) return reject(createError.InternalServerError('Refresh token secret is not defined'));

            JWT.verify(refreshToken, secret, (err, payload) => {
                if (err) {
                    console.log(err.message);
                    return reject(createError.Unauthorized('Invalid refresh token'));
                }
                const userId = payload.aud; // Extract userId from the payload
                resolve(userId);
            });
        });
    }
};
