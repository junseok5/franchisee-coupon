import { createConnection } from "typeorm"
import App from "./app"
import "./env"
import connectionOptions from "./ormConfig"

const { PORT } = process.env
const app = new App().app

createConnection(connectionOptions)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Listening cardround server on port ${PORT}`)
        })
    })
    .catch(err => console.error(err))
