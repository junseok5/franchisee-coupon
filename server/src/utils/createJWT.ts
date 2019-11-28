import jwt from "jsonwebtoken"

const createJWT = (id: number): string => {
    const token: string = jwt.sign({ id }, process.env.JWT_SECRET || "")

    return token
}

export default createJWT
