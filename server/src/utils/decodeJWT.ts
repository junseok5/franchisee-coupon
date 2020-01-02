import jwt from "jsonwebtoken"
import { getRepository } from "typeorm"
import Owner from "../entities/Owner"

const decodeJWT = async (token: string) => {
    try {
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET || "")
        const { id } = decoded
        const owner = await getRepository(Owner).findOne({
            select: ["num", "id", "email", "name", "password"],
            where: { num: id }
        })

        return owner
    } catch (e) {
        return undefined
    }
}

export default decodeJWT
