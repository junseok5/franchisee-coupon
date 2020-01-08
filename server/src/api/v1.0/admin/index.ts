import { Router } from "express"
import authAdmin from "../../../middlewares/authAdmin"
import * as adminCtrl from "./adminCtrl"

const router = Router()

router.post("/login", adminCtrl.login)
router.post("logout", adminCtrl.logout)
router.get("/check", adminCtrl.check)
router.get("/verification-stores", authAdmin, adminCtrl.readVerificationStores)
router.patch(
    "/verification-stores/:id",
    authAdmin,
    adminCtrl.updateVerificationStore
)
router.get("/ads", authAdmin, adminCtrl.readAdvertisements)
router.delete("/ads/:id", authAdmin, adminCtrl.removeAdvertisement)

export default router
