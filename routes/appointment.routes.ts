import { Router } from "express";
import { appointmentController } from "../controller/appointments.controller";

export class appointmentRoutes {
    router = Router();
    private apc: appointmentController = new appointmentController();
    constructor() {

        // Route to fetch all appontments
        this.router.get('/getall', this.apc.getAllAppointment);

        // Route to get a specific appontment by ID
        this.router.get('/getbyid/:appointmentId', this.apc.getAppointmentById);

        // Route to create appontment 
        this.router.post('/create', this.apc.createAppointment)

        // Route to update appontment details
        this.router.put('/update/:appointmentId', this.apc.updateAppointment);

        // Route to delete a test
        this.router.delete('/delete/:appointmentId', this.apc.deleteAppointment);
    }
}