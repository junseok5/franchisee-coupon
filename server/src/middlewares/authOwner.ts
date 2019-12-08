import { Response } from "express"

export default (req, res: Response, next) => {
    const owner = req.owner

    if (!owner) {
        return res.status(401).json({ ok: false, msg: "NOT_AUTHORIZED" })
    }

    return next()
}
