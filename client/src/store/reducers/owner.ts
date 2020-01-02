import produce from "immer"
import {
    LOG_IN_REQUEST,
    LOG_IN_SUCCESS,
    LOG_IN_FAILURE,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    CHECK_LOGGED_REQUEST,
    CHECK_LOGGED_SUCCESS,
    CHECK_LOGGED_FAILURE,
    LOG_OUT,
    LOAD_MY_STORES_REQUEST,
    LOAD_MY_STORES_FAILURE,
    LOAD_MY_STORES_SUCCESS,
    CHANGE_IS_REGISTERED,
    UPDATE_OWNER_INFO_REQUEST,
    UPDATE_OWNER_INFO_SUCCESS,
    UPDATE_OWNER_INFO_FAILURE,
    CHANGE_IS_UPDATED_OWNER_INFO,
    UPDATE_OWNER_PASSWORD_REQUEST,
    UPDATE_OWNER_PASSWORD_SUCCESS,
    UPDATE_OWNER_PASSWORD_FAILURE,
    CHANGE_IS_UPDATED_OWNER_PASSWORD
} from "../actions/owner"
import { IStore } from "./store"

export interface OwnerMetaInfo {
    num: number
    id: string
    email: string
    name: string
}

export interface OwnerState {
    isLoggingIn: boolean // 로그인 요청중
    isLoggedIn: boolean // 로그인 성공
    loginErrorMessage: string // 로그인 실패 메세지
    isCheckingLogged: boolean // 로그인 체크 요청중
    isRegistering: boolean // 회원가입 시도중
    isRegistered: boolean // 회원가입 성공
    registerErrorMessage: string // 회원가입 실패 메세지
    me: OwnerMetaInfo | null // owner 정보
    token: string | null // 로그인 인증 토큰
    isLoadingMyStores: boolean
    myStores: IStore[]
    loadMystoresErrorMessage: string
    isUpdatingOwnerInfo: boolean
    isUpdatedOwnerInfo: boolean
    updateOwnerInfoErrorMessage: string
    isUpdatingOwnerPassword: boolean
    isUpdatedOwnerPassword: boolean
    updateOwnerPasswordErrorMessage: string
}

const initialState: OwnerState = {
    isLoggingIn: false,
    isLoggedIn: window.sessionStorage.getItem("jwt") !== null,
    loginErrorMessage: "",
    isCheckingLogged: false,
    isRegistering: false,
    isRegistered: false,
    registerErrorMessage: "",
    me: null,
    token: window.sessionStorage.getItem("jwt"),
    isLoadingMyStores: false,
    myStores: [],
    loadMystoresErrorMessage: "",
    isUpdatingOwnerInfo: false,
    isUpdatedOwnerInfo: false,
    updateOwnerInfoErrorMessage: "",
    isUpdatingOwnerPassword: false,
    isUpdatedOwnerPassword: false,
    updateOwnerPasswordErrorMessage: ""
}

function owner(state: OwnerState = initialState, action: any) {
    return produce(state, draft => {
        switch (action.type) {
            case LOG_IN_REQUEST:
                draft.isLoggingIn = true
                draft.loginErrorMessage = ""
                break
            case LOG_IN_SUCCESS:
                draft.isLoggingIn = false
                draft.isLoggedIn = true
                draft.loginErrorMessage = ""
                draft.me = action.payload.owner
                draft.token = action.payload.token
                break
            case LOG_IN_FAILURE:
                draft.isLoggingIn = false
                draft.isLoggedIn = false
                draft.loginErrorMessage = action.payload
                draft.me = null
                draft.token = null
                break
            case CHECK_LOGGED_REQUEST:
                draft.isCheckingLogged = true
                break
            case CHECK_LOGGED_SUCCESS:
                draft.isCheckingLogged = false
                draft.isLoggedIn = true
                draft.me = action.payload.owner
                break
            case CHECK_LOGGED_FAILURE:
                draft.isCheckingLogged = false
                break
            case REGISTER_REQUEST:
                draft.isRegistering = true
                draft.registerErrorMessage = ""
                break
            case REGISTER_SUCCESS:
                draft.isRegistering = false
                draft.isRegistered = true
                draft.registerErrorMessage = ""
                draft.isLoggedIn = true
                draft.me = action.payload.owner
                draft.token = action.payload.token
                break
            case REGISTER_FAILURE:
                draft.isRegistering = false
                draft.registerErrorMessage = action.payload
                break
            case CHANGE_IS_REGISTERED:
                draft.isRegistered = action.payload
                break
            case LOG_OUT:
                draft.isLoggedIn = false
                draft.me = null
                draft.token = null
                break
            case LOAD_MY_STORES_REQUEST:
                draft.myStores = []
                draft.isLoadingMyStores = true
                draft.loadMystoresErrorMessage = ""
                break
            case LOAD_MY_STORES_SUCCESS:
                draft.isLoadingMyStores = false
                draft.myStores = action.payload
                break
            case LOAD_MY_STORES_FAILURE:
                draft.isLoadingMyStores = false
                draft.loadMystoresErrorMessage = action.payload
                break
            case UPDATE_OWNER_INFO_REQUEST:
                draft.isUpdatingOwnerInfo = true
                draft.updateOwnerInfoErrorMessage = ""
                break
            case UPDATE_OWNER_INFO_SUCCESS:
                draft.isUpdatingOwnerInfo = false
                draft.isUpdatedOwnerInfo = true
                break
            case UPDATE_OWNER_INFO_FAILURE:
                draft.isUpdatingOwnerInfo = false
                draft.updateOwnerInfoErrorMessage = action.payload
                break
            case CHANGE_IS_UPDATED_OWNER_INFO:
                draft.isUpdatedOwnerInfo = action.payload
                break
            case UPDATE_OWNER_PASSWORD_REQUEST:
                draft.isUpdatingOwnerPassword = true
                draft.updateOwnerPasswordErrorMessage = ""
                break
            case UPDATE_OWNER_PASSWORD_SUCCESS:
                draft.isUpdatingOwnerPassword = false
                draft.isUpdatedOwnerPassword = true
                break
            case UPDATE_OWNER_PASSWORD_FAILURE:
                draft.isUpdatingOwnerPassword = false
                draft.updateOwnerPasswordErrorMessage = action.payload
                break
            case CHANGE_IS_UPDATED_OWNER_PASSWORD:
                draft.isUpdatedOwnerPassword = action.payload
                break
            default:
                break
        }
    })
}

export default owner
