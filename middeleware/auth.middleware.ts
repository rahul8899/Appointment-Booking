import jwt, { JsonWebTokenError } from 'jsonwebtoken';
import { Users } from '../models/users'; // Replace this with your Users model
import { NextFunction } from 'express';
import { Request, Response } from "express";
import { decode } from 'jsonwebtoken';

const tokenSecret: any = process.env.JWT_SECREAT_KEY; // Replace with your JWT secret




// Middleware to authenticate the JWT token
export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token: string | null =
            "token" in req.headers ? (req.headers.token as string) : null;
        let jwtPayload;
        const secret: string = process.env.JWT_SECRET || "";

        if (token) {
            //Try to validate the token and get data
            try {
                jwtPayload = <any>jwt.verify(token, secret);
                res.locals.jwtPayload = jwtPayload;
                res.locals.user = res.locals.jwtPayload.data;
            } catch (error) {
                //If token is not valid, respond with 401 (unauthorized)
                res.status(401).json({ message: "Invalid auth token provided or user unauthorized!", error });
                return;
            }

            //The token is valid for a time you entered inside .env file
            //We want to send a new token on every request
            const { userId, email } = jwtPayload;
            const newToken = jwt.sign({ userId, email }, secret, {
                expiresIn: process.env.JWT_MAX_AGE,
                algorithm: "HS256",
            });
            res.setHeader("token", newToken);
            //Call the next middleware or controller
            next();
        }
        else {
            res.json({
                message: "Something went wrong! Please try again later...",
            });
        }
    }
    catch (err) {
        return res.status(403).json({ error: 'Invalid token. ' });
    }
};