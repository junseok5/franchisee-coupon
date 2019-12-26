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

interface LoadStoreParams {
    id: number
    token: string
}

export const loadStore = ({ id, token }: LoadStoreParams) =>
    api.get(`/stores/${id}`, {
        headers: { "X-JWT": token }
    })

interface AddBizRegImgParams {
    storeId: number
    formData: FormData
    token: string
}

export const addBizRegImg = ({
    storeId,
    formData,
    token
}: AddBizRegImgParams) =>
    api.post(`/stores/${storeId}/verification-stores`, formData, {
        headers: { "Content-Type": "multipart/form-data", "X-JWT": token }
    })
