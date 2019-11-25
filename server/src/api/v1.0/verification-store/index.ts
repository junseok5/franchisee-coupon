import { Router } from "express"
import * as verificationStoreCtrl from "./verificationStoreCtrl"

const router: Router = Router()

router.post("/", verificationStoreCtrl.write)
router.patch("/:id", verificationStoreCtrl.update)

export default router
