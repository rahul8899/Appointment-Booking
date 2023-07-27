import { Request, Response } from "express";
import { Users } from "../models/users";

export class userController {
    getUsers = async (req: Request, res: Response) => {
        try {
            const users = await Users.findAll();
            // for getting data without password 
            // const sanitizedUsers = users.map((user: any) => {
            //     const { id, firstName, lastName, email } = user;
            //     return { id, firstName, lastName, email };
            // });
            // return res.status(200).json(sanitizedUsers);
            if (users) {
                return res.status(200).json({
                    success: true,
                    data: users
                })
            } else {
                return res.json({
                    success: false,
                    message: "does not have data"
                })
            }
        } catch (error) {
            console.error('Error fetching users:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    };

    getUserByID = async (req: Request, res: Response) => {
        const { userId } = req.params;
        // const userId = req.params.id;  Both are same

        try {
            const user = await Users.findByPk(userId)
            if (user) {
                // Remove sensitive data (password) before sending the response
                // const { id, firstName, lastName, email } = user;
                return res.status(200).json({
                    success: true,
                    data: user
                });
            } else {
                return res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            console.error('Error fetching user by id:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    };

    updateUser = async (req: Request, res: Response) => {
        const { userId } = req.params;
        // const { body } = req;
        const { firstName } = req.params;
        const { lastName } = req.params;
        const { email } = req.params;

        try {
            // Find the user by id in the database
            const user = await Users.findByPk(userId);
            if (user) {
                await user.update({ firstName, lastName, email });
                res.json({
                    success: true,
                    // for geting data without password field
                    // data: { firstName: user.firstName, lastName: user.lastName, email: user.email }
                    data: user
                })
            } else {
                return res.status(404).json({ message: 'User not found' });
            }

        } catch (error) {
            console.error('Error updating user:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    };

    deleteUser = async (req: Request, res: Response) => {
        const { userId } = req.params;
        try {
            const user = await Users.findByPk(userId)
            if (user) {
                await user.destroy();
                return res.status(200).json({
                    success: true,
                    message: 'User deleted successfully'
                })
            } else {
                return res.status(404).json({
                    success: false,
                    message: 'User not found'
                });
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}