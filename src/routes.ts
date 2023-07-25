import express from "express"
import { authRoutes } from "../routes/auth.routes";
export class Routes {
    route = express.Router();

    path() {
        this.route.use('/auth', new authRoutes().router);

        return this.route
    }
}