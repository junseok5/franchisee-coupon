import { NextFunction, Request, Response } from "express"
import Joi from "joi"
import Store from "../../../entities/Store"
import VerificationStore from "../../../entities/VerificationStore"

export const read = async (req: Request, res: Response, next: NextFunction) => {
    const id = Number(req.params.id)

    try {
        const store = await Store.findOne({ id })

        if (!store) {
            return res.status(404).send("가맹점이 존재하지 않습니다.")
        }

        delete store.owner
        return res.json(store)
    } catch (e) {
        return next(e)
    }
}

export const write = async (req, res: Response, next: NextFunction) => {
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
        return res.status(400).send("유효하지 않은 입력 값이 존재합니다.")
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

        return res.json(savedStore)
    } catch (e) {
        return next(e)
    }
}

export const update = async (req, res: Response, next: NextFunction) => {
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
        return res.status(400).send("유효하지 않은 입력 값이 존재합니다.")
    }

    if (logoImg) {
        store.logoImg = `/${logoImg.path}`
    }

    try {
        const exists = await Store.findOne({ id })

        if (!exists) {
            return res.status(404).send("가맹점이 존재하지 않습니다.")
        }

        await Store.update({ id }, { ...store })

        return res.send("업데이트에 성공하였습니다.")
    } catch (e) {
        return next(e)
    }
}

export const remove = (req: Request, res: Response) => {
    // 관련 쿠폰/특가 모두 삭제 (나중에 구현)
}

export const registerBizRegImg = async (
    req,
    res: Response,
    next: NextFunction
) => {
    const storeId = Number(req.params.storeId)
    const owner = req.owner
    const bizRegImg = req.file

    if (!bizRegImg) {
        return res.status(400).send("사업자 인증서 사진이 존재하지 않습니다.")
    }

    try {
        const store = await Store.findOne(
            { id: storeId },
            { relations: ["owner"] }
        )

        if (!store) {
            return res.status(404).send("가맹점이 존재하지 않습니다.")
        }

        const storeOWner = store.owner

        if (owner.id !== storeOWner.id) {
            return res.status(401).send("가맹점의 점주가 아닙니다.")
        }

        const verificationStore = await VerificationStore.findOne({ store })

        if (!verificationStore) {
            return res
                .status(404)
                .send(
                    "가맹점 인증 정보가 만들어지지 않았습니다. 관리자에게 문의해주세요."
                )
        }

        verificationStore.bizRegImg = `/${bizRegImg.path}`
        verificationStore.save()

        return res.json({
            ok: true,
            data: { verificationStore }
        })
    } catch (e) {
        console.error(e)
        return next(e)
    }
}

export const patchVerificationStore = async (
    req,
    res: Response,
    next: NextFunction
) => {
    const { storeId } = req.params
    const { status } = req.body

    try {
        const verificationStore = await VerificationStore.findOne({
            store: storeId
        })

        if (!verificationStore) {
            return res.status(404).send("인증한 적이 없는 가맹점입니다.")
        }

        verificationStore.status = status
        verificationStore.save()

        return res.send("사업자 인증 상태 변경에 성공하였습니다.")
    } catch (e) {
        return next(e)
    }
}
