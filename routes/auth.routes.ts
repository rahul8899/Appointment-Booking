import { Router } from "express";
import { authController } from "../controller/auth.controller";
import { bodyValidator } from "../middeleware/validate.schema.middeleware";
import { usersSchema } from "../schema.validation/users.schema";

export class authRoutes {
    router = Router();
    private ac: authController = new authController();
    constructor() {
        // Route to register 
        this.router.post('/register', bodyValidator(usersSchema), this.ac.registerUser)

        //Route to login into system
        this.router.post('/login', this.ac.loginUser)
    }
}