import decodeJWT from "../utils/decodeJWT"

export default async (req, res, next) => {
    const token = req.get("X-JWT")

    if (!token) {
        req.owner = null
        return next()
    }

    try {
        const owner = await decodeJWT(token)
        req.owner = owner
    } catch (e) {
        req.owner = null
    }

    return next()
}
