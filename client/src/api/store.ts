import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:5000/api/v1.0"
})

interface AddStoreParams {
    formData: FormData
    token: string
}

export const addStore = ({ formData, token }: AddStoreParams) =>
    api.post("/stores", formData, {
        headers: { "Content-Type": "multipart/form-data", "X-JWT": token }
    })
