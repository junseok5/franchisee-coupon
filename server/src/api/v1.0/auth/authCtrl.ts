import { NextFunction, Request, Response } from "express"
import Joi from "joi"
import Owner from "../../../entities/Owner"
import { RegisterOwnerBody } from "../../../types/types"
import createJWT from "../../../utils/createJWT"

export const register = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
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
        return res.status(400).send("유효하지 않은 입력 값이 존재합니다.")
    }

    try {
        const existingOwner = await Owner.find({
            where: [{ id }, { email }]
        })

        if (existingOwner.length) {
            return res.status(401).send("이미 존재하는 계정입니다.")
        }

        const owner = await Owner.create({
            name,
            id,
            password,
            email
        }).save()

        const token = createJWT(owner.num)
        delete owner.password
        return res.json({ owner, token })
    } catch (e) {
        return next(e)
    }
}

export const login = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
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
        return res.status(400).send("유효하지 않은 입력 값이 존재합니다.")
    }

    try {
        const owner = await Owner.findOne({ id })

        if (!owner) {
            return res.status(401).send("아이디가 존재하지 않습니다.")
        }

        const isValidPassword = await owner.comparePassword(password)

        if (isValidPassword) {
            const token = createJWT(owner.num)
            delete owner.password
            return res.json({ owner, token })
        } else {
            return res.status(401).send("비밀번호가 잘못되었습니다.")
        }
    } catch (e) {
        return next(e)
    }
}

export const check = async (req, res: Response, next: NextFunction) => {
    const owner = req.owner

    if (!owner) {
        return res.status(401).send("로그인이 되어있지 않습니다.")
    }

    const token = createJWT(owner.num)
    delete owner.password
    return res.json({ owner, token })
}
