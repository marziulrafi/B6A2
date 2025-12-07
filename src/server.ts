import express, { Request, Response } from "express"
import config from "./config"
import initDB from "./config/db"
import { userRoutes } from "./modules/users/user.routes"
import { vehicleRoutes } from "./modules/vehicles/vehicle.routes"
import { bookingRoutes } from "./modules/bookings/booking.routes"
import { signupRoutes } from "./modules/auth/signup/signup.routes"
import { signinRoutes } from "./modules/auth/signin/signin.routes"


const app = express()

app.use(express.json())

const port = config.port

initDB()

app.get("/", (req: Request, res: Response) => {
    res.send("Vehicle Rental App is running!")
})


app.use("/api/v1/users", userRoutes)
app.use("/api/v1/vehicles", vehicleRoutes)
app.use("/api/v1/bookings", bookingRoutes)
app.use("/api/v1/auth", signupRoutes)
app.use("/api/v1/auth", signinRoutes)



app.listen(config.port, () => {
    console.log(`App listening on port ${port}`)
})