import { Request, Response } from "express"
import Joi from "joi"
import { moreInfo } from "../../../constants"
import Store from "../../../entities/Store"
import VerificationStore from "../../../entities/VerificationStore"

export const read = async (req: Request, res: Response) => {
    const id = Number(req.params.id)

    try {
        const store = await Store.findOne({ id })

        if (!store) {
            return res.status(404).json({
                ok: false,
                client_message: "가맹점이 존재하지 않습니다.",
                server_message: "Not found store.",
                code: 31,
                more_info: moreInfo
            })
        }

        delete store.owner
        return res.json({
            ok: true,
            data: { store }
        })
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

export const write = async (req, res: Response) => {
    const store = req.body
    const owner = req.owner
    const logoImg = req.file

    const schema = Joi.object().keys({
        name: Joi.string()
            .min(1)
            .max(30)
            .required(),
        description: Joi.string(),
        address: Joi.string().required(),
        detailAddress: Joi.string().required(),
        category: Joi.string().required(),
        webUrl: Joi.string().required(),
        lat: Joi.number().required(),
        lng: Joi.number().required()
    })

    const validation = Joi.validate(store, schema)

    if (validation.error) {
        console.error(validation.error)
        return res.status(400).json({
            ok: false,
            client_message: "유효하지 않은 입력 값이 존재합니다.",
            server_message: validation.error,
            code: 32,
            more_info: moreInfo
        })
    }

    if (logoImg) {
        store.logoImg = `/${logoImg.path}`
    }

    try {
        const savedStore = await Store.create({
            ...store,
            owner
        }).save()

        // api test 필요
        await VerificationStore.create({
            store
        }).save()

        return res.json({
            ok: true,
            data: { store: savedStore }
        })
    } catch (e) {
        return res.status(500).json({
            ok: false,
            client_message: "서버 에러로 인해 등록에 실패하였습니다.",
            server_message: e.message,
            code: 100,
            more_info: moreInfo
        })
    }
}

export const update = async (req, res: Response) => {
    const id = req.params.id
    const store = req.body
    const logoImg = req.file

    const schema = Joi.object().keys({
        name: Joi.string()
            .min(1)
            .max(30),
        description: Joi.string(),
        address: Joi.string(),
        detailAddress: Joi.string(),
        category: Joi.string(),
        webUrl: Joi.string(),
        lat: Joi.number(),
        lng: Joi.number()
    })

    const validation = Joi.validate(store, schema)

    if (validation.error) {
        console.error(validation.error)
        return res.status(400).json({
            ok: false,
            client_message: "유효하지 않은 입력 값이 존재합니다.",
            server_message: validation.error,
            code: 32,
            more_info: moreInfo
        })
    }

    if (logoImg) {
        store.logoImg = `/${logoImg.path}`
    }

    try {
        const exists = await Store.findOne({ id })

        if (!exists) {
            return res.status(404).json({
                ok: false,
                client_message: "가맹점이 존재하지 않습니다.",
                server_message: "Not found store",
                code: 33,
                more_info: moreInfo
            })
        }

        await Store.update({ id }, { ...store })

        return res.json({
            ok: true,
            client_message: "업데이트에 성공하였습니다.",
            server_message: "Success to update store"
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
    // 관련 쿠폰/특가 모두 삭제 (나중에 구현)
}

export const registerBizRegImg = async (req, res: Response) => {
    const storeId = Number(req.params.storeId)
    const owner = req.owner
    const bizRegImg = req.file

    if (!bizRegImg) {
        return res.status(400).json({
            ok: false,
            client_message: "사업자 등록 인증서 사진이 존재하지 않습니다.",
            server_message: "Need business Registration image",
            code: 34,
            more_info: moreInfo
        })
    }

    try {
        const store = await Store.findOne(
            { id: storeId },
            { relations: ["owner"] }
        )

        if (!store) {
            return res.status(404).json({
                ok: false,
                client_message: "가맹점이 존재하지 않습니다.",
                server_message: "Not found store.",
                code: 35,
                more_info: moreInfo
            })
        }

        const storeOWner = store.owner

        if (owner.id !== storeOWner.id) {
            return res.status(401).json({
                ok: false,
                client_message: "가맹점의 점주가 아닙니다.",
                server_message: "Not store owner",
                code: 36,
                more_info: moreInfo
            })
        }

        const verificationStore = await VerificationStore.findOne({ store })

        if (!verificationStore) {
            return res.status(404).json({
                ok: false,
                client_message:
                    "가맹점 인증 정보가 만들어지지 않았습니다. 관리자에게 문의해주세요.",
                server_message: "Not found verification store.",
                code: 45,
                more_info: moreInfo
            })
        }

        verificationStore.bizRegImg = `/${bizRegImg.path}`
        verificationStore.save()

        return res.json({
            ok: true,
            data: { verificationStore }
        })
    } catch (e) {
        console.error(e)
        return res.status(500).json({
            ok: false,
            client_message: "서버 에러로 인해 인증 등록에 실패하였습니다.",
            server_message: e.message,
            code: 100,
            more_info: moreInfo
        })
    }
}

export const patchVerificationStore = async (req, res: Response) => {
    const { storeId } = req.params
    const { status } = req.body

    try {
        const verificationStore = await VerificationStore.findOne({
            store: storeId
        })

        if (!verificationStore) {
            return res.status(404).json({
                ok: false,
                client_message: "인증한 적이 없는 가맹점입니다.",
                server_message: "Not found verification store",
                code: 38,
                more_info: moreInfo
            })
        }

        verificationStore.status = status
        verificationStore.save()

        return res.json({
            ok: true,
            client_message: "인증 상태 변경에 성공하였습니다.",
            server_message: "Success to change status"
        })
    } catch (e) {
        return res.status(500).json({
            ok: false,
            client_message: "서버 에러로 인해 인증 상태 변경에 실패하였습니다.",
            server_message: e.message,
            code: 100,
            more_info: moreInfo
        })
    }
}
