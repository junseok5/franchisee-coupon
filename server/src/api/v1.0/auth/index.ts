import { Router } from "express"
import * as authCtrl from "./authCtrl"

const router: Router = Router()

router.post("/register", authCtrl.register)
router.post("/login", authCtrl.login)
router.post("/logout", authCtrl.logout)
router.get("/check", authCtrl.checkLogin)

export default router
