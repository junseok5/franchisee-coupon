"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_1 = __importDefault(require("./admin"));
const ads_1 = __importDefault(require("./ads"));
const auth_1 = __importDefault(require("./auth"));
const owners_1 = __importDefault(require("./owners"));
const stores_1 = __importDefault(require("./stores"));
const router = express_1.default.Router();
router.use("/ads", ads_1.default);
router.use("/auth", auth_1.default);
router.use("/owners", owners_1.default);
router.use("/stores", stores_1.default);
router.use("/admin", admin_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map