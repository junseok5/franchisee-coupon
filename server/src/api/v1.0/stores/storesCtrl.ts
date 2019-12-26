import { NextFunction, Request, Response } from "express"
import Joi from "joi"
import Store from "../../../entities/Store"
import VerificationStore from "../../../entities/VerificationStore"

export const read = async (req: Request, res: Response, next: NextFunction) => {
    const id = Number(req.params.id)

    try {
        const store = await Store.findOne(
            { id },
            { relations: ["verificationStore"] }
        )

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
    const storeBody = req.body
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
        category: Joi.number().required(),
        webUrl: Joi.string().required(),
        lat: Joi.number().required(),
        lng: Joi.number().required()
    })

    const validation = Joi.validate(storeBody, schema)

    if (validation.error) {
        console.error(validation.error)
        return res.status(400).send("유효하지 않은 입력 값이 존재합니다.")
    }

    if (logoImg) {
        storeBody.logoImg = `/${logoImg.filename}`
    }

    try {
        const verificationStore = await VerificationStore.create().save()
        const store = await Store.create({
            ...storeBody,
            owner,
            verificationStore
        }).save()

        return res.json(store)
    } catch (e) {
        return next(e)
    }
}

export const update = async (req, res: Response, next: NextFunction) => {
    const owner = req.owner
    const storeId = req.params.id
    const storeBody = req.body
    const logoImg = req.file

    try {
        const store = await Store.findOne(
            { id: storeId },
            { relations: ["owner"] }
        )

        if (!store) {
            return res.status(404).send("가맹점이 존재하지 않습니다.")
        }

        if (store.owner.id !== owner.id) {
            return res.status(401).send("가맹점 점주가 아닙니다.")
        }

        const schema = Joi.object().keys({
            name: Joi.string()
                .min(1)
                .max(30),
            description: Joi.string(),
            address: Joi.string(),
            detailAddress: Joi.string(),
            category: Joi.number(),
            webUrl: Joi.string(),
            lat: Joi.number(),
            lng: Joi.number()
        })

        const validation = Joi.validate(storeBody, schema)

        if (validation.error) {
            console.error(validation.error)
            return res.status(400).send("유효하지 않은 입력 값이 존재합니다.")
        }

        if (logoImg) {
            storeBody.logoImg = `/${logoImg.filename}`
        }

        await Store.update({ id: storeId }, { ...storeBody })

        return res.send("업데이트에 성공하였습니다.")
    } catch (e) {
        return next(e)
    }
}

export const remove = async (req, res: Response, next: NextFunction) => {
    // 관련 쿠폰/특가, 사업자 인증 모두 삭제 (나중에 구현)
    const owner = req.owner
    const storeId = req.params.id

    try {
        const store = await Store.findOne(
            { id: storeId },
            { relations: ["owner"] }
        )

        if (!store) {
            return res.status(404).send("가맹점이 존재하지 않습니다.")
        }

        if (store.owner.id !== owner.id) {
            return res.status(401).send("가맹점 점주가 아닙니다.")
        }

        await store.remove()

        return res.send("삭제에 성공하였습니다.")
    } catch (e) {
        return next(e)
    }
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
            { relations: ["owner", "verificationStore"] }
        )

        if (!store) {
            return res.status(404).send("가맹점이 존재하지 않습니다.")
        }

        const storeOWner = store.owner

        if (owner.id !== storeOWner.id) {
            return res.status(401).send("가맹점의 점주가 아닙니다.")
        }

        if (!store.verificationStore) {
            return res
                .status(404)
                .send(
                    "가맹점 인증 정보가 만들어지지 않았습니다. 관리자에게 문의해주세요."
                )
        }

        store.verificationStore.bizRegImg = `/${bizRegImg.filename}`
        store.verificationStore.status = "REQUESTING"
        store.verificationStore.save()

        return res.send("사업자 인증서 제출을 성공하였습니다.")
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
        const store = await Store.findOne(
            {
                id: storeId
            },
            { relations: ["verificationStore"] }
        )

        if (!store) {
            return res.status(404).send("가맹점이 존재하지 않습니다.")
        }

        if (!store.verificationStore) {
            return res.status(404).send("인증한 적이 없는 가맹점입니다.")
        }

        store.verificationStore.status = status
        store.verificationStore.save()

        return res.send("사업자 인증 상태 변경에 성공하였습니다.")
    } catch (e) {
        return next(e)
    }
}
