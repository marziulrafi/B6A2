import { Router } from "express"
import { signinController } from "./signin.controller"

const router = Router()

router.post("/signin", signinController.signinUser)

export const signinRoutes = router