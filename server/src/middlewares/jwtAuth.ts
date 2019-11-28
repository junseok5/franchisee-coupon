import { NextFunction, Request, Response } from "express"
import decodeJWT from "../utils/decodeJWT"

export default async (req: Request, res: Response, next: NextFunction) => {
    const token = req.get("X-JWT")

    if (!token) {
        req.body.owner = null
        return next()
    }

    try {
        const owner = await decodeJWT(token)
        req.body.owner = owner
    } catch (e) {
        req.body.owner = null
    }

    return next()
}
