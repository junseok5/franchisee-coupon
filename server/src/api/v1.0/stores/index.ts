import { Router } from "express"
import multer from "multer"
import authAdmin from "../../../middlewares/authAdmin"
import authOwner from "../../../middlewares/authOwner"
import * as storesCtrl from "./storesCtrl"

const router = Router()
const upload = multer({ dest: "../uploads/stores/" })

// authentication 필요
router.get("/maps-geocoding", authOwner, storesCtrl.readMapGeocoding)
router.get("/:id", storesCtrl.read)
router.post("/", authOwner, upload.single("logoImg"), storesCtrl.write)
router.patch("/:id", authOwner, upload.single("logoImg"), storesCtrl.update)
router.delete("/:id", authOwner, storesCtrl.remove)

router.get("/:storeId/ads", authOwner, storesCtrl.listStoreAds)
router.post(
    "/:storeId/verification-stores",
    authOwner,
    upload.single("bizRegImg"),
    storesCtrl.registerBizRegImg
)
router.patch(
    "/:storeId/verification-stores",
    authAdmin,
    storesCtrl.patchVerificationStore
)

export default router
