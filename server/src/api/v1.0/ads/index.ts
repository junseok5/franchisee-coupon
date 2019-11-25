import { Router } from "express"
import * as adsCtrl from "./adsCtrl"

const router: Router = Router()

router.get("/:id", adsCtrl.read)
router.get("/", adsCtrl.list)
router.post("/", adsCtrl.write)
router.patch("/:id", adsCtrl.update)
router.delete("/:id", adsCtrl.remove)

export default router
