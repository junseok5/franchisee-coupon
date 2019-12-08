import { Response } from "express"

export default (req, res: Response, next) => {
    if (!req.session.logged) {
        return res.status(401).json({
            ok: false,
            msg: "NOT_AUTHORIZED"
        })
    }

    return next()
}
