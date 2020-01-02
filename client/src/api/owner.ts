import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:5000/api/v1.0"
})

export interface LogInBody {
    id: string
    password: string
}

export const logIn = (body: LogInBody) => api.post(`/auth/login`, body)

export interface RegisterBody {
    id: string
    password: string
    email: string
    name: string
}

export const register = (body: RegisterBody) => api.post("/auth/register", body)

export const checkLogged = (token: string) =>
    api.get("auth/check", {
        headers: { "X-JWT": token }
    })

export interface LoadMyStoresParams {
    id: number | string
    token: string
}

export const loadMyStores = ({ id, token }: LoadMyStoresParams) =>
    api.get(`/owners/${id}/stores`, {
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
    api.patch(`/owners/${id}`, body, {
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
    api.patch(`/owners/${id}/password`, body, {
        headers: { "X-JWT": token }
    })
