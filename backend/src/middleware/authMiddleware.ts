import { NextFunction, Request, Response } from 'express';
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';

// Extend Express Request to include the "user" property
interface AuthenticatedRequest extends Request {
    user?: string | JwtPayload;
}

// Authentication Middleware
const authenticate = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.split(' ')[1]; // Expecting "Bearer <token>"
    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    try {
        const secret: Secret = process.env.JWT_SECRET!;
        const decoded = jwt.verify(token, secret);
        req.user = decoded; // Attach the decoded token payload to the request
        next();
    } catch (error) {
        res.status(400).json({ error: `Invalid token: ${(error as Error).message}` });
    }
};

export default authenticate;