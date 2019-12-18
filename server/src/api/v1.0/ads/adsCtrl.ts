import { Request, Response } from "express"
import Joi from "joi"
import { Between, getRepository } from "typeorm"
import { moreInfo } from "../../../constants"
import Advertisement from "../../../entities/Advertisement"
import Store from "../../../entities/Store"
import VerificationStore from "../../../entities/VerificationStore"

export const read = async (req: Request, res: Response) => {
    const id = Number(req.params.id)

    try {
        const ad = await Advertisement.findOne({ id })

        if (!ad) {
            return res.status(404).json({
                ok: false,
                client_message: "광고가 존재하지 않습니다.",
                server_message: "Not found advertisement.",
                code: 50,
                more_info: moreInfo
            })
        }

        return res.json({
            ok: true,
            data: { ad }
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

export const list = async (req: Request, res: Response) => {
    // 위도,경도를 토대로 근처 광고 리스트 조회
    // 카테고리로 광고 리스트 조회
    // 근처를 카테고리로 조회
    const { category } = req.query
    const lat = Number(req.query.lat)
    const lng = Number(req.query.lng)
    const radius = Number(req.query.radius)

    let query
    query = category
        ? {
              category
          }
        : {}
    query = lat
        ? {
              ...query,
              lat: Between(lat - radius, lat + radius),
              lng: Between(lng - radius, lng + radius)
          }
        : { ...query }

    try {
        const ads = await getRepository(Advertisement).find(query)

        return res.json({
            ok: true,
            data: { ads }
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
    const ad = req.body
    const photo = req.file
    const storeId = req.params.id
    const owner = req.owner

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
                code: 41,
                more_info: moreInfo
            })
        }

        if (store.owner.id !== owner.id) {
            return res.status(401).json({
                ok: false,
                client_message: "가맹점 점주 계정이 아닙니다.",
                server_message: "Not authenticated owner",
                code: 42,
                more_info: moreInfo
            })
        }

        const verificationStore = await VerificationStore.findOne({ store })

        if (!verificationStore) {
            return res.status(404).json({
                ok: false,
                client_message:
                    "가맹점 인증 정보가 존재하지 않습니다. 관리자에게 문의해주세요.",
                server_message: "Not found verification store.",
                code: 46,
                more_info: moreInfo
            })
        }

        if (verificationStore.status !== "ACCEPTED") {
            return res.status(401).json({
                ok: false,
                client_message: "사업자 인증을 먼저 진행해주세요.",
                server_message: "Not verified store.",
                code: 43,
                more_info: moreInfo
            })
        }

        const schema = Joi.object().keys({
            title: Joi.string().required(),
            description: Joi.string(),
            startAt: Joi.date().required(),
            endAt: Joi.date().required(),
            adType: Joi.string().required(),
            category: Joi.string().required()
        })

        const validation = Joi.validate(ad, schema)

        if (validation.error) {
            console.error(validation.error)
            return res.status(400).json({
                ok: false,
                client_message: "유효하지 않은 입력 값이 존재합니다.",
                server_message: validation.error,
                code: 44,
                more_info: moreInfo
            })
        }

        if (photo) {
            ad.photo = `/${photo.path}`
        }

        const savedAd = await Advertisement.create({
            ...ad,
            lat: store.lat,
            lng: store.lng,
            store
        }).save()

        return res.json({
            ok: true,
            data: { ad: savedAd }
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
    const owner = req.owner
    const photo = req.file

    try {
        const ad = await Advertisement.findOne({ id }, { relations: ["store"] })

        if (!ad) {
            return res.status(404).json({
                ok: false,
                client_message: "해당 id의 광고가 존재하지 않습니다.",
                server_message: "Not found advertisement",
                code: 47,
                more_info: moreInfo
            })
        }

        const store = await Store.findOne(
            { id: ad.store.id },
            { relations: ["owner"] }
        )

        if (!store) {
            return res.status(404).json({
                ok: false,
                client_message:
                    "광고를 등록한 가맹점 정보가 존재하지 않습니다.",
                server_message: "Not found store",
                code: 48,
                more_info: moreInfo
            })
        }

        if (store.owner.id !== owner.id) {
            return res.status(401).json({
                ok: false,
                client_message: "광고를 등록한 점주가 아닙니다.",
                server_message: "Not authenticated owner",
                code: 49,
                more_info: moreInfo
            })
        }

        const schema = Joi.object().keys({
            title: Joi.string(),
            description: Joi.string(),
            startAt: Joi.date(),
            endAt: Joi.date(),
            adType: Joi.string(),
            category: Joi.string()
        })

        const validation = Joi.validate(req.body, schema)
        if (validation.error) {
            return res.status(400).json({
                ok: false,
                client_message: "유효하지 않은 입력 값이 존재합니다.",
                server_message: validation.error,
                code: 44,
                more_info: moreInfo
            })
        }

        if (photo) {
            req.body.photo = `/${photo.path}`
        }

        await Advertisement.update(
            { id },
            {
                ...req.body
            }
        )

        return res.json({
            ok: true,
            data: {
                client_message: "업데이트에 성공하였습니다.",
                server_message: "Success to update advertisement."
            }
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

export const remove = async (req, res: Response) => {
    const owner = req.owner
    const id = req.params.id

    try {
        const ad = await Advertisement.findOne({ id }, { relations: ["store"] })

        if (!ad) {
            return res.status(404).json({
                ok: false,
                client_message: "해당 id의 광고가 존재하지 않습니다.",
                server_message: "Not found advertisement.",
                code: 50,
                more_info: moreInfo
            })
        }

        const store = await Store.findOne(
            { id: ad.store.id },
            { relations: ["owner"] }
        )

        if (!store) {
            return res.status(404).json({
                ok: false,
                client_message: "광고를 등록한 점주가 아닙니다.",
                server_message: "Not found store.",
                code: 48,
                more_info: moreInfo
            })
        }

        if (store.owner.id !== owner.id) {
            return res.status(401).json({
                ok: false,
                client_message: "광고를 등록한 점주가 아닙니다.",
                server_message: "Not authenticated owner",
                code: 49,
                more_info: moreInfo
            })
        }

        await ad.remove()

        return res.json({
            ok: true,
            client_message: "삭제에 성공하였습니다.",
            server_message: "Success to remove advertisement"
        })
    } catch (e) {
        return res.status(500).json({
            ok: false,
            client_message: "서버 에러로 삭제에 실패하였습니다.",
            server_message: e.message,
            code: 100,
            more_info: moreInfo
        })
    }
}
