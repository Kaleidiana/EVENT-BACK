const JWT = require('jsonwebtoken');
const createError = require('http-errors');

module.exports = {
    // Generating access token for the user
    signAccessToken: (userId) => {
        return new Promise((resolve, reject) => {
            const payload = { userId }; // Include user-specific data here
            const secret = process.env.ACCESS_TOKEN_SECRET;
            if (!secret) return reject(createError.InternalServerError('Access token secret is not defined'));

            const options = {
                expiresIn: '1h',
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

        // Handle possible "Bearer " prefix
        const parts = authHeader.split(' ');
        if (parts.length !== 2 || parts[0] !== 'Bearer') {
            return next(createError.Unauthorized('Invalid authorization format'));
        }
        const token = parts[1];

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
