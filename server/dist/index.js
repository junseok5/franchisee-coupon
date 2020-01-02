"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const app_1 = __importDefault(require("./app"));
require("./env");
const ormConfig_1 = __importDefault(require("./ormConfig"));
const { PORT } = process.env;
const app = new app_1.default().app;
typeorm_1.createConnection(ormConfig_1.default)
    .then(() => {
    app.listen(PORT, () => {
        console.log(`Listening cardround server on port ${PORT}`);
    });
})
    .catch(err => console.error(err));
//# sourceMappingURL=index.js.map