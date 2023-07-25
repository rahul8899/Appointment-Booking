// authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const tokenSecret = 'your_jwt_secret'; // Replace with your JWT secret

// Middleware to authenticate the JWT token
export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Authentication token missing' });
    }

    try {
        const decodedToken = jwt.verify(token, tokenSecret);
        // req.user = decodedToken;
        next();
    } catch (error) {
        console.error('Error verifying token:', error.message);
        return res.status(403).json({ message: 'Invalid or expired token' });
    }
};
