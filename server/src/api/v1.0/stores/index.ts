import { Router } from "express"
import * as storesCtrl from "./storesCtrl"

const router: Router = Router()

// authentication 필요
router.get("/:id", storesCtrl.read)
router.post("/", storesCtrl.write)
router.patch("/:id", storesCtrl.update)
router.delete("/:id", storesCtrl.remove)

export default router
