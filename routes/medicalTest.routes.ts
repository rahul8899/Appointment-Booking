import { Router } from "express";
import { medicalTestsController } from "../controller/medicaltests.controller";
import { bodyValidator } from "../middeleware/validate.schema.middeleware";
import { authMiddleware } from "../middeleware/auth.middleware";
import { medicalTestSchema } from "../schema.validation/medicaltest.schema";

export class medialTestRoutes {
    router = Router();
    private mc: medicalTestsController = new medicalTestsController();
    constructor() {

        // Route to fetch all test
        this.router.get('/getall', authMiddleware, this.mc.getTest);

        // Route to get a specific test by ID
        this.router.get('/getbyid/:testId', authMiddleware, this.mc.getTestByID);

        // Route to create test 
        this.router.post('/create', authMiddleware, bodyValidator(medicalTestSchema), this.mc.createTest)

        // Route to update test details
        this.router.put('/update/:testId', authMiddleware, bodyValidator(medicalTestSchema), this.mc.updateTest);

        // Route to delete a test
        this.router.delete('/delete/:testId', authMiddleware, this.mc.deleteTest);
    }
}