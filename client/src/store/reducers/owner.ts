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
    GET_MY_STORE_LIST_REQUEST,
    GET_MY_STORE_LIST_SUCCESS,
    GET_MY_STORE_LIST_FAILURE,
    LOG_OUT
} from "../actions/owner"

export interface OwnerMetaInfo {
    num: number
    id: string
    email: string
    name: string
}

export interface StoreInfo {
    id: number
    name: string
    description: string
    address: string
    detailAddress: string
    category: string
    webUrl?: string
    logoImg: string
    lat: number
    lng: number
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
    isGettingMyStores: boolean
    myStores: StoreInfo[]
    getMystoresErrorMessage: string
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
    isGettingMyStores: false,
    myStores: [],
    getMystoresErrorMessage: ""
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
            case LOG_OUT:
                draft.isLoggedIn = false
                draft.me = null
                draft.token = null
                break
            case GET_MY_STORE_LIST_REQUEST:
                draft.myStores = []
                draft.isGettingMyStores = true
                draft.getMystoresErrorMessage = ""
                break
            case GET_MY_STORE_LIST_SUCCESS:
                draft.isGettingMyStores = false
                draft.myStores = action.payload
                break
            case GET_MY_STORE_LIST_FAILURE:
                draft.isGettingMyStores = false
                draft.getMystoresErrorMessage = action.payload
                break
            default:
                break
        }
    })
}

export default owner
