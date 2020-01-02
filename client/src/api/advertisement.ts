import axios from "axios"
import * as queryString from "query-string"
import { apiBaseURL } from "src/constants"

const api = axios.create({
    baseURL: apiBaseURL
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
    api.post(`/v1.0/ads/stores/${storeId}`, formData, {
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
    api.patch(`/v1.0/ads/${adId}`, formData, {
        headers: { "Content-Type": "multipart/form-data", "X-JWT": token }
    })

export interface RemoveAdvertisementParams {
    id: number | string
    token: string
}

export const removeAdvertisement = ({ id, token }: RemoveAdvertisementParams) =>
    api.delete(`/v1.0/ads/${id}`, {
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
        `/v1.0/ads/?${queryString.stringify({
            category,
            lat,
            lng,
            radius,
            storeId
        })}`
    )
