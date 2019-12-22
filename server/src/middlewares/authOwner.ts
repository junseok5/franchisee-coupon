import { Response } from "express"

export default (req, res: Response, next) => {
    const owner = req.owner

    if (!owner) {
        return res.status(401).send("로그인이 필요합니다.")
    }

    return next()
}
