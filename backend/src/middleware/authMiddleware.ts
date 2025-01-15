import { NextFunction, Request, Response } from 'express';
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';

//Define type of decoded token for req.user
interface DecodedToken {
    id: string;
    iat: number;
    exp: number;
}

interface AuthenticatedRequest extends Request {
    user?: DecodedToken;
}


// Authentication Middleware
const authenticate = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.split(' ')[1]; // Expecting "Bearer <token>"
    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    try {
        const secret: Secret = process.env.JWT_SECRET || (() => {
            throw new Error('JWT_SECRET is not defined');
        })();
        const decoded = jwt.verify(token, secret) as DecodedToken; // Use DecodedToken type here
        req.user = decoded; // Attach the decoded token payload to the request
        next();
    } catch (error) {
        res.status(400).json({ error: 'Invalid token.' });
    }
};

export default authenticate;