import express from "express";
import { Router } from "express";
import { authController } from "../controller/auth.controller";
import { authenticateToken } from "../middeleware/auth.middleware";

export class authRoutes {
    router = Router();
    private ac: authController = new authController();
    constructor() {
        this.router.post('/register', this.ac.registerUser)
        this.router.post('/login', this.ac.loginUser)
    }
}