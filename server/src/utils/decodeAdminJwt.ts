import jwt from "jsonwebtoken"
import Admin from "../entities/Admin"

const decodeAdminJwt = async (token: string) => {
    try {
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET || "")
        const { id } = decoded
        const admin = await Admin.findOne({ num: id })
        return admin
    } catch (e) {
        return undefined
    }
}

export default decodeAdminJwt
