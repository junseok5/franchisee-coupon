import { Response } from "express"

export default (req, res: Response, next) => {
    if (!req.session.logged) {
        return res.status(401).send("관리자 로그인이 필요합니다.")
    }

    return next()
}
