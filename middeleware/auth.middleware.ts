import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../controller/auth.controller"; // Import JWT_SECRET from the auth.controller

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        return res.status(401).json({ message: "Token missing" });
    }

    try {
        const decodedToken = jwt.verify(token, JWT_SECRET) as { userId: number };
        req.userId = decodedToken.userId;
        next();
    } catch (err) {
        console.error("Invalid token:", err);
        return res.status(401).json({ message: "Invalid token" });
    }
};
