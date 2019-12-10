import { Request, Response } from "express"
import Joi from "joi"
// import Store from "../../../entities/Store"
import { moreInfo } from "../../../constants"
import Owner from "../../../entities/Owner"

export const read = (req, res: Response) => {
    // 점주 정보 조회
    const owner = req.owner

    return res.json({
        ok: true,
        data: { owner }
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
            return res.status(404).json({
                ok: false,
                client_message: "가맹주 정보가 존재하지 않습니다.",
                server_message: "Not found owner.",
                code: 21,
                more_info: moreInfo
            })
        }
        const stores = owner.stores

        return res.json({ ok: true, data: { stores } })
    } catch (e) {
        return res.status(500).json({
            ok: false,
            client_message: "서버 에러로 인해 조회에 실패하였습니다.",
            server_message: e.message,
            code: 100,
            more_info: moreInfo
        })
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
        return res.status(400).json({
            ok: false,
            client_message: "유효하지 않은 값이 입력되었습니다.",
            server_message: validation.error,
            code: 22,
            more_info: moreInfo
        })
    }

    if (ownerBody.password) {
        owner.password = ownerBody.password
        owner.save()
        delete ownerBody.password
    }

    try {
        await Owner.update({ id: owner.id }, { ...ownerBody })

        return res.json({
            ok: true,
            client_message: "업데이트에 성공하였습니다.",
            server_message: "Success to update owner"
        })
    } catch (e) {
        return res.status(500).json({
            ok: false,
            client_message: "서버 에러로 인해 업데이트에 실패하였습니다.",
            server_message: e.message,
            code: 100,
            more_info: moreInfo
        })
    }
}

export const remove = (req: Request, res: Response) => {
    // 점주 정보와 점주와 관련된 모든 정보 삭제
}
