import bodyParser from "body-parser"
import cors from "cors"
import express from "express"
import session from "express-session"
import helmet from "helmet"
import logger from "morgan"
import api from "./api"
import jwtAuth from "./middlewares/jwtAuth"

class App {
    public app
    private sessionConfig

    constructor() {
        this.app = express()
        this.sessionConfig = {
            secret: process.env.SESSION_SECRET || "",
            resave: false,
            saveUninitialized: true
        }
        this.runMiddlewares()
    }

    private runMiddlewares = () => {
        this.app.use(cors())
        this.app.use(logger("dev"))
        this.app.use(helmet())
        this.app.use(bodyParser.json())
        this.app.use(session(this.sessionConfig))
        this.app.use(jwtAuth)
        this.app.use("/api", api)
    }
}

export default App
