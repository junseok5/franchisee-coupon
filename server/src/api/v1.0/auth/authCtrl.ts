import { Request, Response } from "express"
import Joi from "joi"
import Owner from "../../../entities/Owner"
import { RegisterOwnerBody } from "../../../types/types"
import createJWT from "../../../utils/createJWT"

export const register = async (req: Request, res: Response) => {
    const { name, id, password, email }: RegisterOwnerBody = req.body

    const schema = Joi.object().keys({
        name: Joi.string()
            .min(2)
            .max(10)
            .required(),
        id: Joi.string()
            .min(2)
            .max(30)
            .required(),
        password: Joi.string()
            .min(6)
            .max(30)
            .required(),
        email: Joi.string()
            .email()
            .required()
    })

    const validation = Joi.validate(req.body, schema)

    if (validation.error) {
        console.error(validation.error)
        return res.status(400).json({ ok: false, msg: validation.error })
    }

    try {
        const existingOwner = await Owner.find({
            where: [{ id }, { email }]
        })

        if (existingOwner.length) {
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
    const { id, password } = req.body

    const schema = Joi.object({
        id: Joi.string()
            .min(2)
            .max(30)
            .required(),
        password: Joi.string()
            .min(6)
            .max(30)
    })

    const validation = Joi.validate(req.body, schema)

    if (validation.error) {
        console.error(validation.error)
        return res.status(400).json({ ok: false, msg: validation.error })
    }

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

export const check = async (req, res: Response) => {
    const { owner } = req

    if (!owner) {
        return res.status(401).json({ ok: false, msg: "NOT_LOGIN" })
    }

    const token = createJWT(owner.num)
    return res.json({ ok: true, owner, token })
}
