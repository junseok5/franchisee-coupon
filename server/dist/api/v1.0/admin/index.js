"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adminCtrl = __importStar(require("./adminCtrl"));
const router = express_1.Router();
router.post("/login", adminCtrl.login);
router.post("logout", adminCtrl.logout);
exports.default = router;
//# sourceMappingURL=index.js.map