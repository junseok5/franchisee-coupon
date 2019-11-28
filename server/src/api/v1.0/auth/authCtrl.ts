import { Request, Response } from "express"
import Owner from "../../../entities/Owner"
import { RegisterOwnerBody } from "../../../types/types"
import createJWT from "../../../utils/createJWT"

export const register = async (req: Request, res: Response) => {
    const { name, id, password, email }: RegisterOwnerBody = req.body

    try {
        const existingOwner = await Owner.find({
            where: [{ id }, { email }]
        })

        if (!existingOwner.length) {
            return res.status(401).json({ ok: false, msg: "EXISTING_OWNER" })
        }

        const owner = await Owner.create({
            name,
            id,
            password,
            email
        }).save()

        const token = createJWT(owner.num)

        return res.json({
            ok: true,
            owner,
            token
        })
    } catch (e) {
        return res.status(500).json({ ok: false, msg: e.message })
    }
}

export const login = async (req: Request, res: Response) => {
    // 로그인
    const { id, password } = req.body

    try {
        const owner = await Owner.findOne({ id })

        if (!owner) {
            return res.status(401).json({
                ok: false,
                msg: "NOT_FOUND_ID"
            })
        }

        const checkPassword = await owner.comparePassword(password)

        if (checkPassword) {
            const token = createJWT(owner.num)
            return res.json({
                ok: true,
                owner,
                token
            })
        } else {
            return res.status(401).json({
                ok: false,
                msg: "WRONG_PASSWORD"
            })
        }
    } catch (e) {
        return res.status(500).json({ ok: false, msg: e.message })
    }
}

export const checkLogin = async (req: Request, res: Response) => {
    // 로그인 확인
    const { owner } = req.body

    if (!owner) {
        return res.status(401).json({ ok: false, msg: "NOT_LOGIN" })
    }

    const token = createJWT(owner.num)
    return res.json({ ok: true, owner, token })
}
