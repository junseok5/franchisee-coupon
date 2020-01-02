"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const v1_0_1 = __importDefault(require("./v1.0"));
const router = express_1.default.Router();
router.use("/v1.0", v1_0_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map