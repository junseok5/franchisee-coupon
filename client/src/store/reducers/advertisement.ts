import produce from "immer"
import {
    ADD_ADVERTISEMENT_REQUEST,
    ADD_ADVERTISEMENT_SUCCESS,
    ADD_ADVERTISEMENT_FAILURE,
    CHANGE_ADDED_ADVERTISEMENT,
    UPDATE_ADVERTISEMENT_REQUEST,
    UPDATE_ADVERTISEMENT_SUCCESS,
    UPDATE_ADVERTISEMENT_FAILURE,
    CHANGE_ADVERTISEMENT_UPDATED,
    REMOVE_ADVERTISEMENT_REQUEST,
    REMOVE_ADVERTISEMENT_SUCCESS,
    REMOVE_ADVERTISEMENT_FAILURE,
    CHANGE_ADVERTISEMENT_REMOVED,
    LOAD_ADVERTISEMENTS_REQUEST,
    LOAD_ADVERTISEMENTS_FAILURE,
    LOAD_ADVERTISEMENTS_SUCCESS,
    CHANGE_RADIUS,
    CHANGE_ADVERTISEMENT_IN_MODAL
} from "../actions/advertisement"
import { IAdvertisement } from "./store"

export interface AdvertisementState {
    isAddingAdvertisement: boolean
    addAdvertisementErrorMessage: string
    advertisementAdded: boolean
    isUpdatingAdvertisement: boolean
    updateAdvertisementErrorMessage: string
    advertisementUpdated: boolean
    isRemovingAdvertisement: boolean
    removeAdvertisementErrorMessage: string
    advertisementRemoved: boolean
    isLoadingAdvertisements: boolean
    advertisements: IAdvertisement[]
    loadAdvertisementsErrorMessage: string
    radius: number
    advertisementInModal: IAdvertisement | null
}

const initialState: AdvertisementState = {
    isAddingAdvertisement: false,
    addAdvertisementErrorMessage: "",
    advertisementAdded: false,
    isUpdatingAdvertisement: false,
    updateAdvertisementErrorMessage: "",
    advertisementUpdated: false,
    isRemovingAdvertisement: false,
    removeAdvertisementErrorMessage: "",
    advertisementRemoved: false,
    isLoadingAdvertisements: false,
    advertisements: [],
    loadAdvertisementsErrorMessage: "",
    radius: 500,
    advertisementInModal: {
        id: 0,
        title: "",
        photo: "",
        description: "",
        startAt: "",
        endAt: "",
        isStopped: false,
        adType: "",
        category: -1,
        couponNum: "",
        views: 0,
        clickNum: 0,
        downloadNum: 0,
        usedCount: 0,
        lat: 0,
        lng: 0
    }
}

function advertisement(state: AdvertisementState = initialState, action: any) {
    return produce(state, draft => {
        switch (action.type) {
            case ADD_ADVERTISEMENT_REQUEST:
                draft.isAddingAdvertisement = true
                draft.addAdvertisementErrorMessage = ""
                break
            case ADD_ADVERTISEMENT_SUCCESS:
                draft.isAddingAdvertisement = false
                draft.advertisementAdded = true
                break
            case ADD_ADVERTISEMENT_FAILURE:
                draft.isAddingAdvertisement = false
                draft.addAdvertisementErrorMessage = action.payload
                break
            case CHANGE_ADDED_ADVERTISEMENT:
                draft.advertisementAdded = action.payload
                break
            case UPDATE_ADVERTISEMENT_REQUEST:
                draft.isUpdatingAdvertisement = true
                draft.updateAdvertisementErrorMessage = ""
                break
            case UPDATE_ADVERTISEMENT_SUCCESS:
                draft.isUpdatingAdvertisement = false
                draft.advertisementUpdated = true
                break
            case UPDATE_ADVERTISEMENT_FAILURE:
                draft.isUpdatingAdvertisement = false
                draft.updateAdvertisementErrorMessage = action.payload
                break
            case CHANGE_ADVERTISEMENT_UPDATED:
                draft.advertisementUpdated = action.payload
                break
            case REMOVE_ADVERTISEMENT_REQUEST:
                draft.isRemovingAdvertisement = true
                draft.removeAdvertisementErrorMessage = ""
                break
            case REMOVE_ADVERTISEMENT_SUCCESS:
                draft.isRemovingAdvertisement = false
                draft.advertisementRemoved = true
                break
            case REMOVE_ADVERTISEMENT_FAILURE:
                draft.isRemovingAdvertisement = false
                draft.removeAdvertisementErrorMessage = action.payload
                break
            case CHANGE_ADVERTISEMENT_REMOVED:
                draft.advertisementRemoved = action.payload
                break
            case LOAD_ADVERTISEMENTS_REQUEST:
                draft.isLoadingAdvertisements = true
                draft.loadAdvertisementsErrorMessage = ""
                break
            case LOAD_ADVERTISEMENTS_SUCCESS:
                draft.isLoadingAdvertisements = false
                draft.advertisements = action.payload
                break
            case LOAD_ADVERTISEMENTS_FAILURE:
                draft.isLoadingAdvertisements = false
                draft.loadAdvertisementsErrorMessage = action.payload
                break
            case CHANGE_RADIUS:
                draft.radius = action.payload
                break
            case CHANGE_ADVERTISEMENT_IN_MODAL:
                draft.advertisementInModal = action.payload
                break
            default:
                break
        }
    })
}

export default advertisement
