import { Router } from "express"
import multer from "multer"
import authAdmin from "../../../middlewares/authAdmin"
import authOwner from "../../../middlewares/authOwner"
import * as storesCtrl from "./storesCtrl"

const router = Router()
const upload = multer({ dest: "uploads/" })

// authentication 필요
router.get("/:id", storesCtrl.read)
router.post("/", authOwner, upload.single("image"), storesCtrl.write)
router.patch("/:id", authOwner, upload.single("image"), storesCtrl.update)
router.delete("/:id", authOwner, storesCtrl.remove)

router.post(
    "/:id/verification-stores",
    authOwner,
    upload.single("image"),
    storesCtrl.writeVerificationStore
)
router.patch(
    "/:storeId/verification-stores",
    authAdmin,
    storesCtrl.patchVerificationStore
)

export default router
