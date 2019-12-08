import { Request, Response } from "express"
import Joi from "joi"
import Store from "../../../entities/Store"
import VerificationStore from "../../../entities/VerificationStore"

export const read = async (req: Request, res: Response) => {
    const id = Number(req.params.id)

    try {
        const store = await Store.findOne({ id })

        if (!store) {
            return res.status(404).json({ ok: false, error: "NOT_FOUND_STORE" })
        }

        delete store.owner
        return res.json({
            ok: true,
            store
        })
    } catch (e) {
        return res.status(500).json({ ok: false, error: e.message })
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
        detailAdress: Joi.string().required(),
        category: Joi.string().required(),
        webUrl: Joi.string().required(),
        latitude: Joi.number().required(),
        longitude: Joi.number().required()
    })

    const validation = Joi.validate(store, schema)

    if (validation.error) {
        console.error(validation.error)
        return res.status(400).json({ ok: false, msg: validation.error })
    }

    if (logoImg) {
        store.logoImg = `/${logoImg.path}`
    }

    try {
        const savedStore = await Store.create({
            ...store,
            owner
        }).save()

        return res.json({
            ok: true,
            store: savedStore
        })
    } catch (e) {
        return res.status(500).json({ ok: false, msg: e.message })
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
        detailAdress: Joi.string(),
        category: Joi.string(),
        webUrl: Joi.string(),
        latitude: Joi.number(),
        longitude: Joi.number()
    })

    const validation = Joi.validate(store, schema)

    if (validation.error) {
        console.error(validation.error)
        return res.status(400).json({ ok: false, msg: validation.error })
    }

    if (logoImg) {
        store.logoImg = `/${logoImg.path}`
    }

    try {
        const exists = await Store.findOne({ id })

        if (!exists) {
            return res.status(404).json({
                ok: false,
                msg: "NOT_FOUND_STORE"
            })
        }

        await Store.update({ id }, { ...store })

        return res.json({ ok: true, msg: "UPDATE_SUCCESS" })
    } catch (e) {
        return res.status(500).json({ ok: false, msg: e.message })
    }
}

export const remove = (req: Request, res: Response) => {
    // 관련 쿠폰/특가 모두 삭제 (나중에 구현)
}

export const writeVerificationStore = async (req, res: Response) => {
    const storeId = Number(req.params.id)
    const owner = req.owner
    const bizRegImg = req.file

    if (!bizRegImg) {
        return res
            .status(400)
            .json({ ok: false, msg: "Need business Registration image" })
    }

    try {
        const store = await Store.findOne(
            { id: storeId },
            { relations: ["owner"] }
        )

        if (!store) {
            return res.status(404).json({
                ok: false,
                msg: "NOT_FOUND_STORE"
            })
        }

        const storeOWner = store.owner

        if (owner.id !== storeOWner.id) {
            return res.status(401).json({
                ok: false,
                msg: "NOT_STORE_OWNER"
            })
        }

        const existsVS = await VerificationStore.findOne({ store })

        if (existsVS) {
            return res.status(401).json({
                ok: false,
                msg: "Already exist verification store."
            })
        }

        const verificationStore = await VerificationStore.create({
            bizRegImg: `/${bizRegImg.path}`,
            store
        }).save()

        return res.json({
            ok: true,
            verificationStore
        })
    } catch (e) {
        return res.status(500).json({
            ok: false,
            msg: e.message
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
            return res
                .status(404)
                .json({ ok: false, msg: "Not found verification store" })
        }

        verificationStore.status = status
        verificationStore.save()

        return res.json({ ok: true, msg: "Success status change" })
    } catch (e) {
        return res.status(500).json({
            ok: false,
            msg: e.message
        })
    }
}
