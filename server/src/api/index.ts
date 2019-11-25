import express, { Router } from "express"
import v1o0 from "./v1.0"

const router: Router = express.Router()

router.use("/v1.0", v1o0)

export default router
