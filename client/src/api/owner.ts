import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:5000/api/v1.0"
})

interface LogInBody {
    id: string
    password: string
}

export const logIn = (body: LogInBody) => api.post(`/auth/login`, body)

interface RegisterBody {
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

export const getMyStores = ({ id, token }: { id: number; token: string }) =>
    api.get(`/owners/${id}/stores`, {
        headers: { "X-JWT": token }
    })
