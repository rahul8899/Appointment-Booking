import express from "express"
import { authRoutes } from "../routes/auth.routes";
import { userRoutes } from "../routes/user.routes";
export class Routes {
    route = express.Router();

    path() {
        this.route.use('/auth', new authRoutes().router);
        this.route.use('/user', new userRoutes().router)
        return this.route
    }
}