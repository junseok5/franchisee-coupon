import { Router } from "express"
import * as adminCtrl from "./adminCtrl"

const router = Router()

router.post("/login", adminCtrl.login)
router.post("logout", adminCtrl.logout)

export default router
