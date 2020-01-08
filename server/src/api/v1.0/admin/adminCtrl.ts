import { getRepository } from "typeorm"
import Advertisement from "../../../entities/Advertisement"
import Store from "../../../entities/Store"
import VerificationStore from "../../../entities/VerificationStore"

export const login = async (req, res) => {
    const { id, password } = req.body
    const adminPwd = process.env.ADMIN_PWD
    const adminId = process.env.ADMIN_ID

    if (id !== adminId) {
        return res.status(401).send("존재하지 않는 아이디입니다.")
    }

    if (password !== adminPwd) {
        return res.status(401).send("비밀번호가 틀렸습니다.")
    }

    req.session.logged = true
    req.session.save()
    return res.send("관리자 로그인에 성공하였습니다.")
}

export const check = async (req, res) => {
    console.log(req.session)
    if (!req.session.logged) {
        return res.send(401).send("로그인되어 있지 않습니다.")
    }

    return res.send("로그인 된 유저입니다.")
}

export const logout = async (req, res) => {
    req.session = null
    return res.send("관리자 로그아웃에 성공하였습니다.")
}

export const readVerificationStores = async (req, res, next) => {
    try {
        const stores = await getRepository(Store)
            .createQueryBuilder("store")
            .leftJoinAndSelect(
                "store.verificationStore",
                "verificationStore",
                "verificationStore.status = 'REQUESTING'"
            )
            .getMany()

        return res.json(stores)
    } catch (e) {
        console.error(e)
        return next(e)
    }
}

export const updateVerificationStore = async (req, res, next) => {
    const id = req.params.id
    const status = req.body.status

    try {
        const verificationStore = await VerificationStore.findOne({ id })

        if (!verificationStore) {
            return res
                .status(404)
                .send("해당 id의 사업자 인증 정보가 존재하지 않습니다.")
        }

        verificationStore.status = status
        verificationStore.save()
        return res.send("성공적으로 수정하였습니다.")
    } catch (e) {
        console.error(e)
        return next(e)
    }
}

export const readAdvertisements = async (req, res, next) => {
    try {
        const advertisements = await Advertisement.find()
        return res.json(advertisements)
    } catch (e) {
        console.error(e)
        return next(e)
    }
}

export const removeAdvertisement = async (req, res, next) => {
    const id = req.params.id

    try {
        const advertisement = await Advertisement.findOne({ id })

        if (!advertisement) {
            return res.status(404).send("해당 id의 광고가 존재하지 않습니다.")
        }

        await advertisement.remove()
        return res.send("삭제에 성공하였습니다.")
    } catch (e) {
        console.error(e)
        return next(e)
    }
}
