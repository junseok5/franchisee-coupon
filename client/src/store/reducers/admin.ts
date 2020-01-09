import produce from "immer"
import {
    ADMIN_LOG_IN_REQUEST,
    ADMIN_LOG_IN_SUCCESS,
    ADMIN_LOG_IN_FAILURE,
    CHECK_ADMIN_LOGGED_REQUEST,
    CHECK_ADMIN_LOGGED_SUCCESS,
    CHECK_ADMIN_LOGGED_FAILURE,
    ADMIN_LOG_OUT,
    LOAD_VERIFICATION_STORES_REQUEST,
    LOAD_VERIFICATION_STORES_SUCCESS,
    LOAD_VERIFICATION_STORES_FAILURE,
    UPDATE_VERIFICATION_STORE_REQUEST,
    UPDATE_VERIFICATION_STORE_SUCCESS,
    UPDATE_VERIFICATION_STORE_FAILURE,
    LOAD_ADMIN_ADVERTISEMENTS_REQUEST,
    LOAD_ADMIN_ADVERTISEMENTS_SUCCESS,
    LOAD_ADMIN_ADVERTISEMENTS_FAILURE,
    REMOVE_ADMIN_ADVERTISEMENT_FAILURE,
    REMOVE_ADMIN_ADVERTISEMENT_REQUEST,
    REMOVE_ADMIN_ADVERTISEMENT_SUCCESS,
    CHANGE_IS_REMOVED_ADVERTISEMENT,
    CHANGE_IS_UPDATED_VERIFICATION_STORE
} from "../actions/admin"
import { IAdvertisement, IStore } from "./store"

export interface AdminState {
    isAdminLoggingIn: boolean
    isAdminLoggedIn: boolean
    adminLoginErrorMessage: string
    isCheckingAdminLogged: boolean
    isLoadingAdvertisements: boolean
    advertisements: IAdvertisement[]
    isLoadingVerificationStores: boolean
    verificationStores: IStore[]
    updateVerificationStoreErrorMessage: string
    isUpdatingVerificationStore: boolean
    isUpdatedVerificationStore: boolean
    isRemovingAdvertisement: boolean
    isRemovedAdvertisement: boolean
    removeAdvertisementErrorMessage: string
    adminToken: string | null
}

const initialState: AdminState = {
    isAdminLoggingIn: false,
    isAdminLoggedIn: window.sessionStorage.getItem("a-jwt") !== null,
    adminLoginErrorMessage: "",
    isCheckingAdminLogged: false,
    isLoadingAdvertisements: false,
    advertisements: [],
    isLoadingVerificationStores: false,
    verificationStores: [],
    updateVerificationStoreErrorMessage: "",
    isUpdatingVerificationStore: false,
    isUpdatedVerificationStore: false,
    isRemovingAdvertisement: false,
    isRemovedAdvertisement: false,
    removeAdvertisementErrorMessage: "",
    adminToken: window.sessionStorage.getItem("a-jwt")
}

function admin(state: AdminState = initialState, action: any) {
    return produce(state, draft => {
        switch (action.type) {
            case ADMIN_LOG_IN_REQUEST:
                draft.isAdminLoggingIn = true
                draft.adminLoginErrorMessage = ""
                break
            case ADMIN_LOG_IN_SUCCESS:
                draft.isAdminLoggingIn = false
                draft.isAdminLoggedIn = true
                draft.adminToken = action.payload
                break
            case ADMIN_LOG_IN_FAILURE:
                draft.isAdminLoggingIn = false
                draft.adminLoginErrorMessage = action.payload
                break
            case CHECK_ADMIN_LOGGED_REQUEST:
                draft.isCheckingAdminLogged = true
                break
            case CHECK_ADMIN_LOGGED_SUCCESS:
                draft.isCheckingAdminLogged = false
                draft.isAdminLoggedIn = true
                break
            case CHECK_ADMIN_LOGGED_FAILURE:
                draft.isCheckingAdminLogged = false
                break
            case ADMIN_LOG_OUT:
                draft.isAdminLoggedIn = false
                break
            case LOAD_VERIFICATION_STORES_REQUEST:
                draft.isLoadingVerificationStores = true
                break
            case LOAD_VERIFICATION_STORES_SUCCESS:
                draft.isLoadingVerificationStores = false
                draft.verificationStores = action.payload
                break
            case LOAD_VERIFICATION_STORES_FAILURE:
                draft.isLoadingVerificationStores = false
                break
            case UPDATE_VERIFICATION_STORE_REQUEST:
                draft.isUpdatingVerificationStore = true
                draft.updateVerificationStoreErrorMessage = ""
                break
            case UPDATE_VERIFICATION_STORE_SUCCESS:
                draft.isUpdatingVerificationStore = false
                draft.isUpdatedVerificationStore = true
                break
            case UPDATE_VERIFICATION_STORE_FAILURE:
                draft.isUpdatingVerificationStore = false
                draft.updateVerificationStoreErrorMessage = action.payload
                break
            case CHANGE_IS_UPDATED_VERIFICATION_STORE:
                draft.isUpdatedVerificationStore = action.payload
                break
            case LOAD_ADMIN_ADVERTISEMENTS_REQUEST:
                draft.isLoadingAdvertisements = true
                break
            case LOAD_ADMIN_ADVERTISEMENTS_SUCCESS:
                draft.isLoadingAdvertisements = false
                draft.advertisements = action.payload
                break
            case LOAD_ADMIN_ADVERTISEMENTS_FAILURE:
                draft.isLoadingAdvertisements = false
                break
            case REMOVE_ADMIN_ADVERTISEMENT_REQUEST:
                draft.isRemovingAdvertisement = true
                draft.removeAdvertisementErrorMessage = ""
                break
            case REMOVE_ADMIN_ADVERTISEMENT_SUCCESS:
                draft.isRemovedAdvertisement = false
                draft.isRemovedAdvertisement = true
                break
            case REMOVE_ADMIN_ADVERTISEMENT_FAILURE:
                draft.isRemovingAdvertisement = false
                draft.removeAdvertisementErrorMessage = action.payload
                break
            case CHANGE_IS_REMOVED_ADVERTISEMENT:
                draft.isRemovedAdvertisement = action.payload
                break
        }
    })
}

export default admin
