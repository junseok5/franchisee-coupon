import { Request, Response } from "express"
import Joi from "joi"
// import Store from "../../../entities/Store"
import Owner from "../../../entities/Owner"

export const read = (req, res: Response) => {
    // 점주 정보 조회
    const owner = req.owner

    return res.json({
        ok: true,
        owner
    })
}

export const listMyStore = async (req, res: Response) => {
    // 점주의 가맹점 리스트 조회
    const ownerId = req.owner.id

    try {
        const owner = await Owner.findOne(
            { id: ownerId },
            { relations: ["stores"] }
        )

        if (!owner) {
            return res.status(404).json({ ok: false, msg: "NOT_FOUND_OWNER" })
        }
        const stores = owner.stores

        return res.json({ ok: true, stores })
    } catch (e) {
        return res.status(500).json({ ok: false, msg: e.message })
    }
}

export const update = async (req, res: Response) => {
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
        return res.status(400).json({ ok: false, msg: validation.error })
    }

    if (ownerBody.password) {
        owner.password = ownerBody.password
        owner.save()
        delete ownerBody.password
    }

    try {
        await Owner.update({ id: owner.id }, { ...ownerBody })

        return res.json({ ok: true, msg: "Update success" })
    } catch (e) {
        return res.status(500).json({ ok: false, msg: e.message })
    }
}

export const remove = (req: Request, res: Response) => {
    // 점주 정보와 점주와 관련된 모든 정보 삭제
}
