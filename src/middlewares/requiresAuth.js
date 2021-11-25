import { verifyAccessToken, verifyRefreshToken } from '../utils/jwt-utils';

function requiresAuth(tokenType = 'accessToken') {
    return function (req, res, next) {
        const authHeader = req.header.authorization;

        if (authHeader) {
            try {
                var [bearer, token] = authHeader.split(' ');
                if (bearer.toLowerCase() !== 'bearer' || !token) {
                    throw Error;
                }
            } catch (err) {
                return res.status(401).send({ success: false, message: 'Bearer token invalid' });
            }
        } else {
            return res.status(401).send({ success: false, message: 'Authorization header not found' });
        }

        try {
            let jwt;
            switch (tokenType) {
                case 'refreshToken':
                    jwt = verifyRefreshToken(token);
                case 'accessToken':
                default:
                    jwt = verifyAccessToken(token);
            }
            req.body.jwt = jwt;
            next();
        } catch (error) {
            return res.status(401).send({ success: false, message: 'Invalid token' });
        }
    };
}
