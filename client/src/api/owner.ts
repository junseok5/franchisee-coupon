import axios from "axios"
import { apiBaseURL } from "src/constants"

const api = axios.create({
    baseURL: apiBaseURL
})

export interface LogInBody {
    id: string
    password: string
}

export const logIn = (body: LogInBody) => api.post(`/v1.0/auth/login`, body)

export interface RegisterBody {
    id: string
    password: string
    email: string
    name: string
}

export const register = (body: RegisterBody) =>
    api.post("/v1.0/auth/register", body)

export const checkLogged = (token: string) =>
    api.get("/v1.0/auth/check", {
        headers: { "X-JWT": token }
    })

export interface LoadMyStoresParams {
    id: number | string
    token: string
}

export const loadMyStores = ({ id, token }: LoadMyStoresParams) =>
    api.get(`/v1.0/owners/${id}/stores`, {
        headers: { "X-JWT": token }
    })

export interface UpdateOwnerInfoParams {
    id: number | string
    token: string
    body: {
        name?: string
        email?: string
        password?: string
    }
}

export const updateOwnerInfo = ({ id, token, body }: UpdateOwnerInfoParams) =>
    api.patch(`/v1.0/owners/${id}`, body, {
        headers: { "X-JWT": token }
    })

export interface UpdateOwnerPasswordParams {
    id: number | string
    token: string
    body: {
        currentPassword: string
        newPassword: string
    }
}

export const updateOwnerPassword = ({
    id,
    token,
    body
}: UpdateOwnerPasswordParams) =>
    api.patch(`/v1.0/owners/${id}/password`, body, {
        headers: { "X-JWT": token }
    })

export interface LoadOwnerInfoParams {
    id: number | string
    token: string
}

export const loadOwnerInfo = ({ id, token }: LoadOwnerInfoParams) =>
    api.get(`/v1.0/owners/${id}`, {
        headers: { "X-JWT": token }
    })
