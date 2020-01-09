import decodeAdminJwt from "../utils/decodeAdminJwt"

export default async (req, res, next) => {
    const token = req.get("A-JWT")

    if (!token) {
        req.admin = null
        return next()
    }

    try {
        const admin = await decodeAdminJwt(token)
        req.admin = admin
    } catch (e) {
        req.owner = null
    }

    return next()
}
