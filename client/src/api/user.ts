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
