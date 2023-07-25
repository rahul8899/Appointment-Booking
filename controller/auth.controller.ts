import { Request, Response } from "express";
import { Users } from "../models/users";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import * as dotenv from "dotenv";
dotenv.config()

const generateToken = (user: any) => {
    const tokenSecret: any = process.env.JWT_SECREAT_KEY
    return jwt.sign({ id: Users.id }, tokenSecret, { expiresIn: '1h' });
}
export class authController {
    registerUser = async (req: Request, res: Response) => {
        const { firstName, lastName, email, password } = req.body;
        try {
            // check is user is allredy registed or not.
            const existingUser = await Users.findOne({ where: { email } });
            if (existingUser) {
                return res.status(409).json({
                    message: "Email is allredy registed."
                })
            }

            // hashing the password
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await Users.create({
                firstName,
                lastName,
                email,
                password: hashedPassword,
            })

            //genearate JWT token and send it into reponse
            const token = generateToken(newUser);
            return res.status(201).json({ token });
        } catch (error) {
            console.log("Error in registering user");
            return res.status(500).json({
                message: "Enternal server Error"
            })
        }
    }

    loginUser = async (req: Request, res: Response) => {
        const { email, password } = req.body;
        try {
            // Find the user by email
            const user = await Users.findOne({ where: { email } })
            if (!user) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            // Compare the provided password with the hashed password in the database
            const passwordValid = await bcrypt.compare(password, user.password)
            if (!passwordValid) {
                return res.status(401).json({ message: "Invalid credentials" })
            }

            // Generate a JWT token and send it in the response
            const token = generateToken(user);
            return res.status(200).json({
                message: "login succesfully",
                token
            });
        } catch (error) {
            console.error('Error logging in user:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}
