import { Request, Response, NextFunction } from "express";

export const bodyValidator = (schema: any) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const result = schema.validate(req.body);
        if (result.error) {
            console.log("there is error ", result);
            return res.json(result.error)
        } else {
            next();
        }
    }
}