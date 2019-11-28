import jwt from "jsonwebtoken"
import Owner from "../entities/Owner"

const decodeJWT = async (token: string): Promise<Owner | undefined> => {
    try {
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET || "")
        const { id } = decoded
        const owner: Owner | undefined = await Owner.findOne({ id })

        return owner
    } catch (e) {
        return undefined
    }
}

export default decodeJWT
