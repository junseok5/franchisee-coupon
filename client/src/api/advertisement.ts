import axios from "axios"
import * as queryString from "query-string"

const api = axios.create({
    baseURL: "http://localhost:5000/api/v1.0"
})

interface AddAdvertisementParams {
    formData: FormData
    token: string
    storeId: string
}

export const addAdvertisement = ({
    formData,
    token,
    storeId
}: AddAdvertisementParams) =>
    api.post(`/ads/stores/${storeId}`, formData, {
        headers: { "Content-Type": "multipart/form-data", "X-JWT": token }
    })

interface UpdateAdvertisementParams {
    formData: FormData
    token: string
    id: number
}

export const updateAdvertisement = ({
    formData,
    token,
    id
}: UpdateAdvertisementParams) =>
    api.patch(`/ads/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data", "X-JWT": token }
    })

interface RemoveAdvertisement {
    id: number
    token: string
}

export const removeAdvertisement = ({ id, token }: RemoveAdvertisement) =>
    api.delete(`/ads/${id}`, {
        headers: { "X-JWT": token }
    })

interface LoadAdvertisementsParams {
    category?: string
    lat?: number
    lng?: number
    radius?: number
    storeId?: number
}

export const loadAdvertisements = ({
    category,
    lat,
    lng,
    radius,
    storeId
}: LoadAdvertisementsParams) =>
    api.get(
        `/ads/?${queryString.stringify({
            category,
            lat,
            lng,
            radius,
            storeId
        })}`
    )
