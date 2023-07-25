import { Router } from "express";
import { authController } from "../controller/auth.controller";

export class authRoutes {
    router = Router();
    private ac: authController = new authController();
    constructor() {
        this.router.post('/register', this.ac.registerUser)
        this.router.post('/login', this.ac.loginUser)
    }
}