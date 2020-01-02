"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const connectionOptions = {
    type: "postgres",
    host: process.env.DB_ENDPOINT,
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: "outsourcing",
    entities: ["entities/**/*.*"],
    synchronize: true,
    logging: true
};
exports.default = connectionOptions;
//# sourceMappingURL=ormConfig.js.map