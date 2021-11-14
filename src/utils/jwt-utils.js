import jwt from 'jsonwebtoken';
import environment from '../config/environment';

export function generateAccessToken(payload, options = {}) {
    const { expiresIn = '1d' } = options;
    return jwt.sign(payload, environment.jwtAccessTokenSecret, { expiresIn });
}

export function generateRefreshToken(payload) {
    return jwt.sign(payload, environment.jwtRefreshTokenSecret);
}

export function verifyAccessToken(accessToken) {
    return jwt.verify(accessToken, environment.jwtAccessTokenSecret);
}

export function verifyRefreshToken(refreshToken) {
    return jwt.verify(refreshToken, environment.jwtRefreshTokenSecret);
}
