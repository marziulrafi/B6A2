import { Request, Response } from "express"
import { vehicleServices } from "./vehicle.service"

const createVehicle = async (req: Request, res: Response) => {
    const result = await vehicleServices.createVehicle(req.body)
    try {
        res.status(201).json({
            success: true,
            message: "Vehicle added successfully",
            data: result.rows[0],
        })
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
        })
    }
}



const getVehicles = async (req: Request, res: Response) => {
    try {
        const result = await vehicleServices.getVehicles()
        res.status(201).json({
            success: true,
            message: "Vehicles retrieved successfully",
            data: result.rows,
        })
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
        })
    }
}



const getSingleVehicle = async (req: Request, res: Response) => {
    const vehicleId = req.params.vehicleId
    try {
        const result = await vehicleServices.getSingleVehicle(vehicleId as string)
        if (result.rows.length === 0) {
            res.status(404).json({
                status: false,
                message: "Not Found!",
            })
        } else {
            res.status(200).json({
                status: true,
                message: "Vehicles retrieved successfully",
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



const updateVehicle = async (req: Request, res: Response) => {
    const vehicleId = req.params.vehicleId

    try {
        const result = await vehicleServices.updateVehicle(
            vehicleId as string,
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
                message: "Vehicle updated successfully",
                data: result.rows[0],
            })
        }
    } catch (err: any) {
        res.status(404).json({
            status: false,
            message: err.message,
        })
    }
}



const deleteVehicle = async (req: Request, res: Response) => {
    const vehicleId = req.params.vehicleId
    try {
        const result = await vehicleServices.deleteVehicle(vehicleId as string)

        if (result.rowCount === 0) {
            res.status(404).json({
                status: false,
                message: "Not Found!",
            })
        } else {
            res.status(200).json({
                status: true,
                message: "Vehicle deleted successfully",
            })
        }
    } catch (err: any) {
        res.status(500).json({
            status: false,
            message: err.message,
        })
    }
}
export const vehicleController = {
    createVehicle,
    getVehicles,
    getSingleVehicle,
    updateVehicle,
    deleteVehicle
}