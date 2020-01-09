import axios from "axios"
import { apiBaseURL } from "src/constants"

const api = axios.create({
    baseURL: apiBaseURL
})

export interface AdminLogInBody {
    id: string
    password: string
}

export const adminLogIn = (body: AdminLogInBody) =>
    api.post(`/v1.0/admin/login`, body)

export const adminCheckLogged = (token: string) =>
    api.get("/v1.0/admin/check", {
        headers: { "A-JWT": token }
    })

export const loadVerificationStores = (token: string) =>
    api.get("/v1.0/admin/verification-stores", {
        headers: { "A-JWT": token }
    })

export interface UpdateVerificationStoreBody {
    id: number | string
    status: string
    token: string
}

export const updateVerificationStore = ({
    id,
    status,
    token
}: UpdateVerificationStoreBody) =>
    api.patch(
        `/v1.0/admin/verification-stores/${id}`,
        { status },
        {
            headers: { "A-JWT": token }
        }
    )

export const loadAdvertisements = (token: string) =>
    api.get("/v1.0/admin/ads", {
        headers: { "A-JWT": token }
    })

export interface RemoveAdvertisementBody {
    id: number | string
    token: string
}

export const removeAdvertisement = ({ id, token }: RemoveAdvertisementBody) =>
    api.delete(`/v1.0/admin/ads/${id}`, {
        headers: { "A-JWT": token }
    })
