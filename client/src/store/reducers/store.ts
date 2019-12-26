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
    CHANGE_ADDED_BIZ_REG_IMG
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
    addBizRegImgErrorMessage: ""
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
            default:
                break
        }
    })
}

export default store
