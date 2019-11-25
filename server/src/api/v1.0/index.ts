import express, { Router } from "express"
import ads from "./ads"
import auth from "./auth"
import owners from "./owners"
import stores from "./stores"

const router: Router = express.Router()

router.use("/ads", ads)
router.use("/auth", auth)
router.use("/owners", owners)
router.use("/stores", stores)

export default router
