import { Router } from "express"
import * as ownersCtrl from "./ownersCtrl"

const router: Router = Router()

// authentication 필요
router.get("/:id", ownersCtrl.read)
router.get("/:id/stores", ownersCtrl.listMyStore)
router.patch("/:id", ownersCtrl.update)
router.delete("/:id", ownersCtrl.remove)

export default router
