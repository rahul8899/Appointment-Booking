import express from "express"
import { authRoutes } from "../routes/auth.routes";
import { userRoutes } from "../routes/user.routes";
import { medialTestRoutes } from "../routes/medicalTest.routes";
import { appointmentRoutes } from "../routes/appointment.routes";
export class Routes {
    route = express.Router();

    path() {
        this.route.use('/auth', new authRoutes().router);
        this.route.use('/user', new userRoutes().router)
        this.route.use('/medicaltest', new medialTestRoutes().router)
        this.route.use('/appointment', new appointmentRoutes().router)
        return this.route
    }
}