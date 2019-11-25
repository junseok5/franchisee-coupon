import cors from "cors"
import express, { Express } from "express"
import helmet from "helmet"
import logger from "morgan"
// import api from "./api"

class App {
    public app: Express = express()

    constructor() {
        this.runMiddlewares()
    }

    private runMiddlewares = () => {
        this.app.use(cors())
        this.app.use(logger("dev"))
        this.app.use(helmet())
        // this.app.use("/api", api)
    }
}

export default App
