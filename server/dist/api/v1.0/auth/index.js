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
const authCtrl = __importStar(require("./authCtrl"));
const router = express_1.Router();
router.post("/register", authCtrl.register);
router.post("/login", authCtrl.login);
router.get("/check", authCtrl.check);
exports.default = router;
//# sourceMappingURL=index.js.map