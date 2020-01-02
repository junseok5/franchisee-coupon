"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const authAdmin_1 = __importDefault(require("../../../middlewares/authAdmin"));
const authOwner_1 = __importDefault(require("../../../middlewares/authOwner"));
const storesCtrl = __importStar(require("./storesCtrl"));
const router = express_1.Router();
const upload = multer_1.default({ dest: "../uploads/stores/" });
// authentication 필요
router.get("/maps-geocoding", authOwner_1.default, storesCtrl.readMapGeocoding);
router.get("/:id", storesCtrl.read);
router.post("/", authOwner_1.default, upload.single("logoImg"), storesCtrl.write);
router.patch("/:id", authOwner_1.default, upload.single("logoImg"), storesCtrl.update);
router.delete("/:id", authOwner_1.default, storesCtrl.remove);
router.get("/:storeId/ads", authOwner_1.default, storesCtrl.listStoreAds);
router.post("/:storeId/verification-stores", authOwner_1.default, upload.single("bizRegImg"), storesCtrl.registerBizRegImg);
router.patch("/:storeId/verification-stores", authAdmin_1.default, storesCtrl.patchVerificationStore);
exports.default = router;
//# sourceMappingURL=index.js.map