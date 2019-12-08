import { Router } from "express"
import * as authCtrl from "./authCtrl"

const router = Router()

router.post("/register", authCtrl.register)
router.post("/login", authCtrl.login)
router.get("/check", authCtrl.check)

export default router
