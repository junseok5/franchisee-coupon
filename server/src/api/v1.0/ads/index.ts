import { Router } from "express"
import multer from "multer"
import authOwner from "../../../middlewares/authOwner"
import * as adsCtrl from "./adsCtrl"

const router: Router = Router()
const upload = multer({ dest: "../uploads/ads/" })

router.get("/:id", adsCtrl.read)
router.get("/", adsCtrl.list)
router.post("/stores/:id", authOwner, upload.single("photo"), adsCtrl.write)
router.patch("/:id", authOwner, upload.single("photo"), adsCtrl.update)
router.delete("/:id", authOwner, adsCtrl.remove)

export default router
