import { Response } from "express"
import { moreInfo } from "../constants"

export default (req, res: Response, next) => {
    const owner = req.owner

    if (!owner) {
        return res.status(401).json({
            ok: false,
            client_message: "로그인이 필요합니다.",
            server_message: "Not authorized",
            code: 101,
            more_info: moreInfo
        })
    }

    return next()
}
