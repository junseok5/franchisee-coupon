import axios from "axios"
import { apiBaseURL } from "src/constants"

const api = axios.create({
    baseURL: apiBaseURL
})

export interface AddStoreParams {
    formData: FormData
    token: string
}

export const addStore = ({ formData, token }: AddStoreParams) =>
    api.post("/v1.0/stores", formData, {
        headers: { "Content-Type": "multipart/form-data", "X-JWT": token }
    })

export interface LoadStoreParams {
    id: number | string
    token: string
}

export const loadStore = ({ id, token }: LoadStoreParams) =>
    api.get(`/v1.0/stores/${id}`, {
        headers: { "X-JWT": token }
    })

export interface AddBizRegImgParams {
    storeId: number | string
    formData: FormData
    token: string
}

export const addBizRegImg = ({
    storeId,
    formData,
    token
}: AddBizRegImgParams) =>
    api.post(`/v1.0/stores/${storeId}/verification-stores`, formData, {
        headers: { "Content-Type": "multipart/form-data", "X-JWT": token }
    })

export interface LoadStoreAdvertisementsParams {
    storeId: number | string
    token: string
}

export const loadStoreAdvertisements = ({
    storeId,
    token
}: LoadStoreAdvertisementsParams) =>
    api.get(`/v1.0/stores/${storeId}/ads`, {
        headers: { "X-JWT": token }
    })

export interface UpdateStoreParams {
    formData: FormData
    id: number | string
    token: string
}

export const updateStore = ({ formData, id, token }: UpdateStoreParams) =>
    api.patch(`/v1.0/stores/${id}`, formData, {
        headers: { "X-JWT": token }
    })

export interface RemoveStoreParams {
    id: number | string
    token: string
}

export const removeStore = ({ id, token }: RemoveStoreParams) =>
    api.delete(`/v1.0/stores/${id}`, {
        headers: { "X-JWT": token }
    })

export interface LoadMapsGeocodingParams {
    query: string
    token: string
}

export const loadMapsGeocoding = ({ query, token }: LoadMapsGeocodingParams) =>
    api.get(`/v1.0/stores/maps-geocoding/?query=${query}`, {
        headers: { "X-JWT": token }
    })
