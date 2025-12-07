import { Request, Response } from "express"
import { bookingService } from "./booking.service"


const createBooking = async (req: Request, res: Response) => {
    try {
        const result = await bookingService.createBooking(req.body)
        res.status(201).json({
            success: true,
            message: "Booked successfully",
            data: result.rows[0],
        })
    } catch (err: any) {
        res.status(404).json({
            success: false,
            message: err.message,
        })
    }
}




const getBookings = async (req: Request, res: Response) => {
    try {
        const result = await bookingService.getBookings()
        res.status(200).json({
            success: true,
            data: result.rows,
        })
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
        })
    }
}



const updateBookings = async (req: Request, res: Response) => {
    const bookingId = req.params.bookingId
    const { status } = req.body

    try {
        const result = await bookingService.updateBookings(
            req.body,
            bookingId as string
        )

        if (result.rows.length === 0) {
            res.status(404).json({
                status: false,
                message: "Not Found!",
            })
        } else {
            res.status(200).json({
                status: true,
                message: "Booking updated successfully",
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



const deleteBooking = async (req: Request, res: Response) => {
    const bookingId = req.params.bookingId
    try {
        const result = await bookingService.deleteBookings(bookingId as string)
        if (result.rowCount === 0) {
            res.status(404).json({
                status: false,
                message: "Not Found!",
            })
        } else {
            res.status(200).json({
                status: true,
                message: "Bookings deleted successfully",
            })
        }
    } catch (err: any) {
        res.status(500).json({
            status: false,
            message: err.message,
        })
    }
}

export const bookingController = {
    createBooking,
    getBookings,
    updateBookings,
    deleteBooking
}