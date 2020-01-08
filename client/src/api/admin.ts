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

export const adminCheckLogged = () => api.get("/v1.0/admin/check")

export const loadVerificationStores = () =>
    api.get("/v1.0/admin/verification-stores")

export interface UpdateVerificationStoreBody {
    id: number | string
    status: string
}

export const updateVerificationStore = ({
    id,
    status
}: UpdateVerificationStoreBody) =>
    api.patch(`/v1.0/admin/verification-stores/${id}`, { status })

export const loadAdvertisements = () => api.get("/v1.0/admin/ads")

export const removeAdvertisement = (id: number | string) =>
    api.delete(`/v1.0/admin/ads/${id}`)
