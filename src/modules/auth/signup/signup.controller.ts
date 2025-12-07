import { Request, Response } from "express"
import { signupService } from "./signup.service"

const signupUser = async (req: Request, res: Response) => {
    try {
        const result = await signupService.signupUser(req.body)
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: result.rows[0],
        })
    } catch (err: any) {
        res.status(404).json({
            success: false,
            message: err.message,
        })
    }
}
export const signupController = {
    signupUser
}