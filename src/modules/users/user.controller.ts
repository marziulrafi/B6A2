import { Request, Response } from "express"
import { userServices } from "./user.service"


const getUsers = async (req: Request, res: Response) => {
    try {
        const result = await userServices.getUsers()
        res.status(200).json({
            success: true,
            message: "Users retrieved successfully",
            data: result.rows,
        })
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
        })
    }
}



const getSingleUser = async (req: Request, res: Response) => {
    const paramsEmail = req.params.email

    try {
        const result = await userServices.getSingleUser(paramsEmail as string)
        if (result.rows.length === 0) {
            res.status(404).json({
                status: false,
                message: "Not Found!",
            })
        } else {
            res.status(200).json({
                status: true,
                data: result.rows[0],
            })
        }
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
        })
    }
}



const updateUser = async (req: Request, res: Response) => {
    const paramsEmail = req.params.email
    try {
        const result = await userServices.updateUser(
            paramsEmail as string,
            req.body
        )

        if (result.rows.length === 0) {
            res.status(404).json({
                status: false,
                message: "Not Found!",
            })
        } else {
            res.status(200).json({
                status: true,
                message: "User updated successfully",
                data: result.rows[0],
            })
        }
    } catch (err: any) {
        res.status(500).json({
            status: false,
            message: err.message,
        })
    }
}



const deleteUser = async (req: Request, res: Response) => {
    const userId = req.params.id

    try {
        const result = await userServices.deleteUser(userId as string)
        if (result.rowCount === 0) {
            res.status(404).json({
                status: false,
                message: "Not Found!",
            })
        } else {
            res.status(200).json({
                status: true,
                message: "User deleted successfully",
            })
        }
    } catch (err: any) {
        res.status(500).json({
            status: false,
            message: err.message,
        })
    }
}



export const userControllers = {
    getUsers,
    getSingleUser,
    updateUser,
    deleteUser
}