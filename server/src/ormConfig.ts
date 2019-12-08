import { ConnectionOptions } from "typeorm"

const connectionOptions: ConnectionOptions = {
    type: "postgres",
    host: process.env.DB_ENDPOINT,
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: "outsourcing",
    entities: ["entities/**/*.*"],
    synchronize: true,
    logging: true
}

export default connectionOptions
