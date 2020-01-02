import axios from "axios"
import * as queryString from "query-string"

const api = axios.create({
    baseURL: "http://localhost:5000/api/v1.0"
})

export interface AddAdvertisementParams {
    formData: FormData
    token: string
    storeId: number | string
}

export const addAdvertisement = ({
    formData,
    token,
    storeId
}: AddAdvertisementParams) =>
    api.post(`/ads/stores/${storeId}`, formData, {
        headers: { "Content-Type": "multipart/form-data", "X-JWT": token }
    })

export interface UpdateAdvertisementParams {
    formData: FormData
    token: string
    adId: number | string
}

export const updateAdvertisement = ({
    formData,
    token,
    adId
}: UpdateAdvertisementParams) =>
    api.patch(`/ads/${adId}`, formData, {
        headers: { "Content-Type": "multipart/form-data", "X-JWT": token }
    })

export interface RemoveAdvertisementParams {
    id: number | string
    token: string
}

export const removeAdvertisement = ({ id, token }: RemoveAdvertisementParams) =>
    api.delete(`/ads/${id}`, {
        headers: { "X-JWT": token }
    })

export interface LoadAdvertisementsParams {
    category?: string
    lat?: number
    lng?: number
    radius?: number
    storeId?: number | string
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
