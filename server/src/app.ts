import bodyParser from "body-parser"
import cors from "cors"
import express from "express"
import session from "express-session"
import helmet from "helmet"
import logger from "morgan"
import path from "path"
import api from "./api"
import jwtAuth from "./middlewares/jwtAuth"

class App {
    public app
    private sessionConfig
    private isProduction

    constructor() {
        this.app = express()
        this.sessionConfig = {
            secret: process.env.SESSION_SECRET || "",
            resave: false,
            saveUninitialized: true
        }
        this.isProduction = process.env.NODE_ENV === "production" ? true : false
        this.runMiddlewares()
    }

    private runMiddlewares = () => {
        if (this.isProduction) {
            this.app.use(
                cors({
                    origin: "url",
                    credentials: true
                })
            )
            this.app.use(logger("combined"))
        } else {
            this.app.use(
                cors({
                    origin: true,
                    credentials: true
                })
            )
            this.app.use(logger("dev"))
        }
        this.app.use(helmet())
        this.app.use(bodyParser.json())
        this.app.use(express.static(path.join(__dirname, "uploads")))
        this.app.use(express.static(path.join(__dirname, "../../client/build")))
        this.app.get("/uploads/stores/:fileName", (req, res) => {
            const fileName = req.params.fileName
            res.sendFile(path.join(__dirname, `../uploads/stores/${fileName}`))
        })
        this.app.get("/uploads/ads/:fileName", (req, res) => {
            const fileName = req.params.fileName
            res.sendFile(path.join(__dirname, `../uploads/ads/${fileName}`))
        })
        this.app.get("*", (req, res) => {
            res.sendFile(path.join(__dirname, "../../client/build/index.html"))
        })
        this.app.use(session(this.sessionConfig))
        this.app.use(jwtAuth)
        this.app.use("/api", api)
    }
}

export default App
