import { Request, Response } from "express"
import Joi from "joi"
import { moreInfo } from "../../../constants"
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
        return res.status(400).json({
            ok: false,
            client_message: "유효하지 않은 입력 값이 존재합니다.",
            server_message: validation.error,
            code: 11,
            more_info: moreInfo
        })
    }

    try {
        const existingOwner = await Owner.find({
            where: [{ id }, { email }]
        })

        if (existingOwner.length) {
            return res.status(401).json({
                ok: false,
                client_message: "이미 존재하는 계정입니다.",
                server_message: "Already exist owner.",
                code: 12,
                more_info: moreInfo
            })
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
            data: {
                owner,
                token
            },
            client_message: "회원가입에 성공하였습니다.",
            server_message: "Success to register owner"
        })
    } catch (e) {
        return res.status(500).json({
            ok: false,
            client_message: "서버 에러로 인해 회원가입에 실패하였습니다.",
            server_message: e.message,
            code: 100,
            more_info: moreInfo
        })
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
        return res.status(400).json({
            ok: false,
            client_message: "유효하지 않은 입력 값이 존재합니다.",
            server_message: validation.error,
            code: 13,
            more_info: moreInfo
        })
    }

    try {
        const owner = await Owner.findOne({ id })

        if (!owner) {
            return res.status(401).json({
                ok: false,
                client_message: "아이디가 존재하지 않습니다.",
                server_message: "Not found id",
                code: 14,
                more_info: moreInfo
            })
        }

        const isValidPassword = await owner.comparePassword(password)

        if (isValidPassword) {
            const token = createJWT(owner.num)
            return res.json({
                ok: true,
                data: { owner, token },
                client_message: "로그인에 성공하였습니다.",
                server_message: "Success to login owner"
            })
        } else {
            return res.status(401).json({
                ok: false,
                client_message: "비밀번호가 잘못되었습니다.",
                server_message: "Not valid password",
                code: 15,
                more_info: moreInfo
            })
        }
    } catch (e) {
        return res.status(500).json({
            ok: false,
            client_message: "서버 에러로 인해 로그인에 실패하였습니다.",
            server_message: e.message,
            code: 100,
            more_info: moreInfo
        })
    }
}

export const check = async (req, res: Response) => {
    const { owner } = req

    if (!owner) {
        return res.status(401).json({
            ok: false,
            client_message: "로그인이 되어있지 않습니다.",
            server_message: "Not logged owner",
            code: 16,
            more_info: moreInfo
        })
    }

    const token = createJWT(owner.num)
    return res.json({
        ok: true,
        data: { owner, token }
    })
}
