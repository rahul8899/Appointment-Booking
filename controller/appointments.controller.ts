import { Request, Response } from "express";
import { Appointment } from "../models/appointments";

export class appointmentController {
    createAppointment = async (req: Request, res: Response) => {
        // const {bosy}=req.body;
        /* Here foraign key consept is going to used.
            userId testId is not collumn but its foraign key.
            that why  const {bosy}=req.body is not gonna work. 
            we have to declare foraign key manyally.
        */
        const { date, slot, userId, testId } = req.body;
        try {
            const appointment = await Appointment.create({ date, slot, userId, testId })
            if (appointment) {
                res.status(201).json({
                    success: true,
                    data: appointment
                })
            } else {
                res.status(500).json({ message: "appoitment is not book" })
            }
        } catch (error) {
            console.error('Error in bookig appointment:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    };
    getAllAppointment = async (req: Request, res: Response) => {
        try {
            const appointment = await Appointment.findAll();
            if (appointment) {
                return res.status(200).json({
                    success: true,
                    data: appointment
                })
            } else {
                return res.json({
                    success: false,
                    message: "does not have any appoitment"
                })
            }
        } catch (error) {
            console.error('Error in fething appoitment list:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    getAppointmentById = async (req: Request, res: Response) => {
        const { appointmentId } = req.params;
        try {
            const appointment = await Appointment.findByPk(appointmentId);
            if (appointment) {
                return res.status(200).json({
                    success: true,
                    data: appointment
                })
            } else {
                return res.status(404).json({ message: "appointment not found" })
            }
        } catch (error) {
            console.error('Error in fetching appointment by id', error);
            return res.status(500).json({ message: 'Internal server error' })
        }
    }

    updateAppointment = async (req: Request, res: Response) => {
        const { appointmentId } = req.params;
        const { body } = req;
        try {
            const appointment = await Appointment.findByPk(appointmentId);
            if (appointment) {
                await appointment.update(body);
                return res.status(200).json({
                    success: true,
                    data: appointment
                })
            } else {
                return res.status(404).json({ message: 'Appointment not update' })
            }
        } catch (error) {
            console.error('Error in updating appointment', error);
            return res.status(500).json({ message: 'Internal server error' })
        }
    }

    deleteAppointment = async (req: Request, res: Response) => {
        const { appointmentId } = req.params;
        try {
            const appointment = await Appointment.findByPk(appointmentId)
            if (appointment) {
                await appointment.destroy();
                return res.status(200).json({
                    Success: true,
                    message: "Appointment is deleted"
                })
            } else {
                return res.status(404).json({ message: "Appointment is not founded." })
            }
        } catch (error) {
            console.error("Error in deleting appoinment", error);
            return res.status(500).json({ message: 'Internal server error' })
        }
    }
}