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
const authOwner_1 = __importDefault(require("../../../middlewares/authOwner"));
const ownersCtrl = __importStar(require("./ownersCtrl"));
const router = express_1.Router();
// authentication 필요
router.get("/:id", authOwner_1.default, ownersCtrl.read);
router.get("/:id/stores", authOwner_1.default, ownersCtrl.listMyStore);
router.patch("/:id", authOwner_1.default, ownersCtrl.update);
router.patch("/:id/password", ownersCtrl.updatePassword);
router.delete("/:id", authOwner_1.default, ownersCtrl.remove);
exports.default = router;
//# sourceMappingURL=index.js.map