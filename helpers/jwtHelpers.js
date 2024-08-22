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
                expiresIn: '60m',
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
        if (!authHeader) {
            return next(createError.Unauthorized('Authorization header missing'));
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            return next(createError.Unauthorized('Token missing from Authorization header'));
        }

        console.log(`Received token: ${token}`); // Log the token being sent

        JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
            if (err) {
                console.log(`Error verifying token: ${err.message}`); // Log the error message
                return next(createError.Unauthorized('Invalid token'));
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
