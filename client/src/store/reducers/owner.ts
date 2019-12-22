import produce from "immer"
import {
    LOG_IN_REQUEST,
    LOG_IN_SUCCESS,
    LOG_IN_FAILURE,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILURE
} from "../actions/owner"

export interface OwnerState {
    isLoggingIn: boolean // 로그인 요청중
    loginErrorMessage: string // 로그인 실패 메세지
    isRegistering: boolean // 회원가입 시도중
    isRegistered: boolean // 회원가입 성공
    registerErrorMessage: string // 회원가입 실패 메세지
}

const initialState: OwnerState = {
    isLoggingIn: false,
    loginErrorMessage: "",
    isRegistering: false,
    isRegistered: false,
    registerErrorMessage: ""
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
                // owner 정보저장
                break
            case LOG_IN_FAILURE:
                draft.isLoggingIn = false
                draft.loginErrorMessage = action.payload
                // owner 정보 null
                break
            case REGISTER_REQUEST:
                draft.isRegistering = true
                draft.registerErrorMessage = ""
                break
            case REGISTER_SUCCESS:
                draft.isRegistering = false
                draft.isRegistered = true
                draft.registerErrorMessage = ""
            case REGISTER_FAILURE:
                draft.isRegistering = false
                draft.registerErrorMessage = action.payload
            default:
                break
        }
    })
}

export default owner
