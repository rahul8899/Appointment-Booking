import { Router } from "express";
import { userController } from "../controller/users.controller";
import { bodyValidator } from "../middeleware/validate.schema.middeleware";
import { usersSchema } from "../schema.validation/users.schema";
import { authMiddleware } from "../middeleware/auth.middleware";
export class userRoutes {
    router = Router();
    private uc: userController = new userController();
    constructor() {

        // Route to fetch all users
        this.router.get('/getall', authMiddleware, this.uc.getUsers);

        // Route to get a specific user by ID
        this.router.get('/getbyid/:userId', this.uc.getUserByID);

        // Route to update user details
        this.router.put('/update/:userId', bodyValidator(usersSchema), this.uc.updateUser);

        // Route to delete a user
        this.router.delete('/delete/:userId', this.uc.deleteUser);
    }
}