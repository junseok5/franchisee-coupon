import { NextFunction, Request, Response } from "express"
import Joi from "joi"
import Owner from "../../../entities/Owner"

export const read = (req, res: Response) => {
    // 점주 정보 조회
    const owner = req.owner
    
    delete owner.password
    return res.json(owner)
}

export const listMyStore = async (req, res: Response, next: NextFunction) => {
    // 점주의 가맹점 리스트 조회
    const ownerId = req.owner.id

    try {
        const owner = await Owner.findOne(
            { id: ownerId },
            { relations: ["stores"] }
        )

        if (!owner) {
            return res.status(404).send("가맹주 정보가 존재하지 않습니다.")
        }
        const stores = owner.stores

        return res.json(stores)
    } catch (e) {
        return next(e)
    }
}

export const update = async (req, res: Response, next: NextFunction) => {
    // 점주 정보 수정
    const owner = req.owner
    const ownerBody = req.body

    const schema = Joi.object().keys({
        name: Joi.string()
            .min(2)
            .max(10),
        password: Joi.string()
            .min(6)
            .max(30),
        email: Joi.string().email()
    })

    const validation = Joi.validate(ownerBody, schema)

    if (validation.error) {
        return res.status(400).send("유효하지 않은 값이 입력되었습니다.")
    }

    if (ownerBody.password) {
        owner.password = ownerBody.password
        owner.save()
        delete ownerBody.password
    }

    try {
        await Owner.update({ id: owner.id }, { ...ownerBody })
        return res.send("업데이트에 성공하였습니다.")
    } catch (e) {
        return next(e)
    }
}

export const updatePassword = async (
    req,
    res: Response,
    next: NextFunction
) => {
    const owner: Owner = req.owner
    const body = req.body

    const schema = Joi.object().keys({
        currentPassword: Joi.string().required(),
        newPassword: Joi.string()
            .min(6)
            .max(30)
            .required()
    })

    const validation = Joi.validate(body, schema)

    if (validation.error) {
        return res.status(400).send("유효하지 않은 값이 입력되었습니다.")
    }

    try {
        const isValidPassword = await owner.comparePassword(
            body.currentPassword
        )

        if (isValidPassword) {
            owner.password = body.newPassword
            owner.save()

            return res.send("비밀번호 변경에 성공하였습니다.")
        } else {
            return res.status(401).send("비밀번호가 틀렸습니다.")
        }
    } catch (e) {
        return next(e)
    }
}

export const remove = (req: Request, res: Response) => {
    // 점주 정보와 점주와 관련된 모든 정보 삭제
}
