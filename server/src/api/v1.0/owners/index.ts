import { Router } from "express"
import authOwner from "../../../middlewares/authOwner"
import * as ownersCtrl from "./ownersCtrl"

const router = Router()

// authentication 필요
router.get("/:id", authOwner, ownersCtrl.read)
router.get("/:id/stores", authOwner, ownersCtrl.listMyStore)
router.patch("/:id", authOwner, ownersCtrl.update)
router.patch("/:id/password", ownersCtrl.updatePassword)
router.delete("/:id", authOwner, ownersCtrl.remove)

export default router
