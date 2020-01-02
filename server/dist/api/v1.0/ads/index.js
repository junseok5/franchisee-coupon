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
const authOwner_1 = __importDefault(require("../../../middlewares/authOwner"));
const adsCtrl = __importStar(require("./adsCtrl"));
const router = express_1.Router();
const upload = multer_1.default({ dest: "../uploads/ads/" });
router.get("/:id", adsCtrl.read);
router.get("/", adsCtrl.list);
router.post("/stores/:id", authOwner_1.default, upload.single("photo"), adsCtrl.write);
router.patch("/:id", authOwner_1.default, upload.single("photo"), adsCtrl.update);
router.delete("/:id", authOwner_1.default, adsCtrl.remove);
exports.default = router;
//# sourceMappingURL=index.js.map