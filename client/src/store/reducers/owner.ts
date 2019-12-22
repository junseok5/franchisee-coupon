import produce from "immer"
import {
    LOG_IN_REQUEST,
    LOG_IN_SUCCESS,
    LOG_IN_FAILURE,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILURE
} from "../actions/owner"

export interface OwnerMetaInfo {
    num: number
    id: string
    email: string
    name: string
}

export interface OwnerState {
    isLoggingIn: boolean // 로그인 요청중
    loginErrorMessage: string // 로그인 실패 메세지
    isRegistering: boolean // 회원가입 시도중
    isRegistered: boolean // 회원가입 성공
    registerErrorMessage: string // 회원가입 실패 메세지
    me: OwnerMetaInfo | null // owner 정보
    token: string | null // 로그인 인증 토큰
}

const initialState: OwnerState = {
    isLoggingIn: false,
    loginErrorMessage: "",
    isRegistering: false,
    isRegistered: false,
    registerErrorMessage: "",
    me: null,
    token: window.sessionStorage.getItem("jwt")
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
                draft.loginErrorMessage = ""
                draft.me = action.payload.owner
                draft.token = action.payload.token
                break
            case LOG_IN_FAILURE:
                draft.isLoggingIn = false
                draft.loginErrorMessage = action.payload
                draft.me = null
                draft.token = null
                break
            case REGISTER_REQUEST:
                draft.isRegistering = true
                draft.registerErrorMessage = ""
                break
            case REGISTER_SUCCESS:
                draft.isRegistering = false
                draft.isRegistered = true
                draft.registerErrorMessage = ""
                draft.me = action.payload.owner
                draft.token = action.payload.token
                break
            case REGISTER_FAILURE:
                draft.isRegistering = false
                draft.registerErrorMessage = action.payload
                break
            default:
                break
        }
    })
}

export default owner
