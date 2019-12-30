import produce from "immer"
import {
    ADD_STORE_REQUEST,
    ADD_STORE_SUCCESS,
    ADD_STORE_FAILURE,
    CHANGE_STORE_ADDED,
    LOAD_STORE_REQUEST,
    LOAD_STORE_SUCCESS,
    LOAD_STORE_FAILURE,
    ADD_BIZ_REG_IMG_REQUEST,
    ADD_BIZ_REG_IMG_SUCCESS,
    ADD_BIZ_REG_IMG_FAILURE,
    CHANGE_ADDED_BIZ_REG_IMG,
    LOAD_STORE_ADVERTISEMENTS_REQUEST,
    LOAD_STORE_ADVERTISEMENTS_SUCCESS,
    LOAD_STORE_ADVERTISEMENTS_FAILURE,
    UPDATE_STORE_REQUEST,
    UPDATE_STORE_SUCCESS,
    UPDATE_STORE_FAILURE,
    CHANGE_STORE_UPDATED,
    REMOVE_STORE_REQUEST,
    REMOVE_STORE_SUCCESS,
    REMOVE_STORE_FAILURE,
    CHANGE_STORE_REMOVED,
    CHANGE_ADDRESS,
    LOAD_MAPS_GEOCODING_REQUEST,
    LOAD_MAPS_GEOCODING_FAILURE,
    LOAD_MAPS_GEOCODING_SUCCESS,
    CHANGE_LAT,
    CHANGE_LNG
} from "../actions/store"

export interface IVerificationStore {
    id: number
    status: string
    bizRegImg?: string
}

export interface IStore {
    id: number
    name: string
    description: string
    address: string
    detailAddress: string
    category: number
    webUrl?: string
    logoImg: string
    lat: number
    lng: number
    verificationStore?: IVerificationStore
}

export interface IAdvertisement {
    id: number
    title: string
    photo: string
    description: string
    startAt: string
    endAt: string
    isStopped: boolean
    adType: string
    category: number
    couponNum?: string
    views: number
    clickNum: number
    downloadNum: number
    usedCount: number
    lat: number
    lng: number
}

export interface StoreState {
    isAddingStore: boolean
    addStoreErrorMessage: string
    storeAdded: boolean
    isLoadingStore: boolean
    store: IStore | null
    loadStoreErrorMessage: string
    isAddingBizRegImg: boolean
    addedBizRegImg: boolean
    addBizRegImgErrorMessage: string
    isLoadingStoreAdvertisements: boolean
    storeAdvertisements: IAdvertisement[]
    loadStoreAdvertisementsErrorMessage: string
    isUpdatingStore: boolean
    updateStoreErrorMessage: string
    storeUpdated: boolean
    isRemovingStore: boolean
    storeRemoved: boolean
    removeStoreErrorMessage: string
    address: string
    lat: number
    lng: number
    isLoadingMapsGeocoding: boolean
    mapsGeocoding: any[]
    loadMapsGeocodingErrorMessage: string
}

const initialState: StoreState = {
    isAddingStore: false, // 가맹점 등록 중
    addStoreErrorMessage: "", // 가맹점 등록 실패 메세지
    storeAdded: false, // 가맹점 등록 성공
    isLoadingStore: false,
    store: null,
    loadStoreErrorMessage: "",
    isAddingBizRegImg: false,
    addedBizRegImg: false,
    addBizRegImgErrorMessage: "",
    isLoadingStoreAdvertisements: false,
    storeAdvertisements: [],
    loadStoreAdvertisementsErrorMessage: "",
    isUpdatingStore: false,
    updateStoreErrorMessage: "",
    storeUpdated: false,
    isRemovingStore: false,
    storeRemoved: false,
    removeStoreErrorMessage: "",
    address: "",
    lat: 0,
    lng: 0,
    isLoadingMapsGeocoding: false,
    mapsGeocoding: [],
    loadMapsGeocodingErrorMessage: ""
}

function store(state: StoreState = initialState, action: any) {
    return produce(state, draft => {
        switch (action.type) {
            case ADD_STORE_REQUEST:
                draft.isAddingStore = true
                draft.addStoreErrorMessage = ""
                break
            case ADD_STORE_SUCCESS:
                draft.isAddingStore = false
                draft.storeAdded = true
                break
            case ADD_STORE_FAILURE:
                draft.isAddingStore = false
                draft.addStoreErrorMessage = action.payload
                break
            case CHANGE_STORE_ADDED:
                draft.storeAdded = action.payload
                break
            case LOAD_STORE_REQUEST:
                draft.isLoadingStore = true
                draft.loadStoreErrorMessage = ""
                break
            case LOAD_STORE_SUCCESS:
                draft.isLoadingStore = false
                draft.store = action.payload
                break
            case LOAD_STORE_FAILURE:
                draft.isLoadingStore = false
                draft.loadStoreErrorMessage = action.payload
                break
            case ADD_BIZ_REG_IMG_REQUEST:
                draft.isAddingBizRegImg = true
                draft.addBizRegImgErrorMessage = ""
                break
            case ADD_BIZ_REG_IMG_SUCCESS:
                draft.isAddingBizRegImg = false
                draft.addedBizRegImg = true
                break
            case ADD_BIZ_REG_IMG_FAILURE:
                draft.isAddingBizRegImg = false
                draft.addBizRegImgErrorMessage = action.payload
                break
            case CHANGE_ADDED_BIZ_REG_IMG:
                draft.addedBizRegImg = action.payload
                break
            case LOAD_STORE_ADVERTISEMENTS_REQUEST:
                draft.isLoadingStoreAdvertisements = true
                draft.loadStoreAdvertisementsErrorMessage = ""
                break
            case LOAD_STORE_ADVERTISEMENTS_SUCCESS:
                draft.isLoadingStoreAdvertisements = false
                draft.storeAdvertisements = action.payload
                break
            case LOAD_STORE_ADVERTISEMENTS_FAILURE:
                draft.isLoadingStoreAdvertisements = false
                draft.loadStoreAdvertisementsErrorMessage = action.payload
                break
            case UPDATE_STORE_REQUEST:
                draft.isUpdatingStore = true
                draft.updateStoreErrorMessage = ""
                break
            case UPDATE_STORE_SUCCESS:
                draft.isUpdatingStore = false
                draft.storeUpdated = true
                break
            case UPDATE_STORE_FAILURE:
                draft.isUpdatingStore = false
                draft.updateStoreErrorMessage = action.payload
                break
            case CHANGE_STORE_UPDATED:
                draft.storeUpdated = action.payload
                break
            case REMOVE_STORE_REQUEST:
                draft.isRemovingStore = true
                draft.removeStoreErrorMessage = ""
                break
            case REMOVE_STORE_SUCCESS:
                draft.isRemovingStore = false
                draft.storeRemoved = true
                break
            case REMOVE_STORE_FAILURE:
                draft.isRemovingStore = false
                draft.removeStoreErrorMessage = action.payload
                break
            case CHANGE_STORE_REMOVED:
                draft.storeRemoved = action.payload
                break
            case CHANGE_ADDRESS:
                draft.address = action.payload
                break
            case CHANGE_LAT:
                draft.lat = action.payload
                break
            case CHANGE_LNG:
                draft.lng = action.payload
                break
            case LOAD_MAPS_GEOCODING_REQUEST:
                draft.isLoadingMapsGeocoding = true
                draft.loadMapsGeocodingErrorMessage = ""
                break
            case LOAD_MAPS_GEOCODING_SUCCESS:
                draft.isLoadingMapsGeocoding = false
                draft.mapsGeocoding = action.payload
                break
            case LOAD_MAPS_GEOCODING_FAILURE:
                draft.isLoadingMapsGeocoding = false
                draft.loadMapsGeocodingErrorMessage = action.payload
                break
            default:
                break
        }
    })
}

export default store
