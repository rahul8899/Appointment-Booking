import { Request, Response } from "express";
import { MedicalTests } from "../models/medicaltests";

export class medicalTestsController {
    getTest = async (req: Request, res: Response) => {
        try {
            const test = await MedicalTests.findAll();
            if (test) {
                return res.status(200).json({
                    success: true,
                    data: test
                })
            } else {
                return res.json({
                    success: false,
                    message: "does not have data"
                })
            }
        } catch (error) {
            console.error('Error fetching in Medical Test:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    };

    getTestByID = async (req: Request, res: Response) => {
        const { testId } = req.params;
        try {
            const test = await MedicalTests.findByPk(testId)
            if (testId) {
                return res.status(200).json({
                    success: true,
                    data: test
                });
            } else {
                return res.status(404).json({ message: 'Test not found by Id' });
            }
        } catch (error) {
            console.error('Error in fetching Test by id:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    };
    createTest = async (req: Request, res: Response) => {
        const { body } = req;
        const { testName } = req.body;
        try {
            // chek is test is allredy exist or not.
            const existingTest = await MedicalTests.findOne({ where: { testName } });
            if (existingTest) {
                return res.status(201).json({
                    message: "Test is allredy Created."
                })
            }
            const test = await MedicalTests.create(body);
            if (test) {
                return res.status(201).json({
                    success: true,
                    data: test
                });
            }
        } catch (error) {
            console.error('Error creating medical test:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    };
    updateTest = async (req: Request, res: Response) => {
        const { testId } = req.params;
        const { body } = req;

        try {
            // Find the user by id in the database
            const user = await MedicalTests.findByPk(testId);
            if (testId) {
                await user.update(body);
                return res.status(200).json({
                    success: true,
                    data: user
                })
            } else {
                return res.status(404).json({ message: 'Test not found' });
            }
        } catch (error) {
            console.error('Error updating Test:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    };

    deleteTest = async (req: Request, res: Response) => {
        const { testId } = req.params;
        try {
            const user = await MedicalTests.findByPk(testId)
            if (user) {
                await user.destroy();
                return res.status(200).json({
                    success: true,
                    message: 'Test deleted successfully'
                });
            } else {
                return res.status(404).json({
                    success: false,
                    message: 'Test not found'
                });
            }
        } catch (error) {
            console.error('Error deleting Test:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}