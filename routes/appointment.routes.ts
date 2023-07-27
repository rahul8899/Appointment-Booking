import { Router } from "express";
import { appointmentController } from "../controller/appointments.controller";
import { bodyValidator } from "../middeleware/validate.schema.middeleware";
import { authMiddleware } from "../middeleware/auth.middleware";
import { appointmentSchema } from "../schema.validation/appointment.schema";
export class appointmentRoutes {
    router = Router();
    private apc: appointmentController = new appointmentController();
    constructor() {

        // Route to fetch all appontments
        this.router.get('/getall', authMiddleware, this.apc.getAllAppointment);

        // Route to get a specific appontment by ID
        this.router.get('/getbyid/:appointmentId', authMiddleware, this.apc.getAppointmentById);

        // Route to create appontment 
        this.router.post('/create', authMiddleware, bodyValidator(appointmentSchema), this.apc.createAppointment)

        // Route to update appontment details
        this.router.put('/update/:appointmentId', authMiddleware, bodyValidator(appointmentSchema), this.apc.updateAppointment);

        // Route to delete a test
        this.router.delete('/delete/:appointmentId', authMiddleware, this.apc.deleteAppointment);
    }
}