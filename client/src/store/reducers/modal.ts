import produce from "immer"
import {
    SHOW_REGISTER_MODAL,
    HIDE_REGISTER_MODAL,
    SHOW_LOGIN_MODAL,
    HIDE_LOGIN_MODAL
} from "../actions/modal"

export interface ModalState {
    loginModalVisible: boolean
    registerModalVisible: boolean
}

const initialState: ModalState = {
    loginModalVisible: false,
    registerModalVisible: false
}

function modal(state: ModalState = initialState, action: any) {
    return produce(state, draft => {
        switch (action.type) {
            case SHOW_REGISTER_MODAL:
                draft.registerModalVisible = true
                break
            case HIDE_REGISTER_MODAL:
                draft.registerModalVisible = false
                break
            case SHOW_LOGIN_MODAL:
                draft.loginModalVisible = true
                break
            case HIDE_LOGIN_MODAL:
                draft.loginModalVisible = false
                break
            default:
                break
        }
    })
}

export default modal
