"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const api_1 = __importDefault(require("./api"));
const jwtAuth_1 = __importDefault(require("./middlewares/jwtAuth"));
class App {
    constructor() {
        this.runMiddlewares = () => {
            if (this.isProduction) {
                this.app.use(cors_1.default({
                    origin: "url",
                    credentials: true
                }));
                this.app.use(morgan_1.default("combined"));
            }
            else {
                this.app.use(cors_1.default({
                    origin: true,
                    credentials: true
                }));
                this.app.use(morgan_1.default("dev"));
            }
            this.app.use(helmet_1.default());
            this.app.use(body_parser_1.default.json());
            this.app.use(express_1.default.static(path_1.default.join(__dirname, "uploads")));
            this.app.use(express_1.default.static(path_1.default.join(__dirname, "../../client/build")));
            this.app.get("/uploads/stores/:fileName", (req, res) => {
                const fileName = req.params.fileName;
                res.sendFile(path_1.default.join(__dirname, `../uploads/stores/${fileName}`));
            });
            this.app.get("/uploads/ads/:fileName", (req, res) => {
                const fileName = req.params.fileName;
                res.sendFile(path_1.default.join(__dirname, `../uploads/ads/${fileName}`));
            });
            this.app.get("*", (req, res) => {
                res.sendFile(path_1.default.join(__dirname, "../../client/build/index.html"));
            });
            this.app.use(express_session_1.default(this.sessionConfig));
            this.app.use(jwtAuth_1.default);
            this.app.use("/api", api_1.default);
        };
        this.app = express_1.default();
        this.sessionConfig = {
            secret: process.env.SESSION_SECRET || "",
            resave: false,
            saveUninitialized: true
        };
        this.isProduction = process.env.NODE_ENV === "production" ? true : false;
        this.runMiddlewares();
    }
}
exports.default = App;
//# sourceMappingURL=app.js.map