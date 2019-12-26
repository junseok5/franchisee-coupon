import produce from "immer"
import {
    SHOW_REGISTER_MODAL,
    HIDE_REGISTER_MODAL,
    SHOW_LOGIN_MODAL,
    HIDE_LOGIN_MODAL,
    SHOW_BIZ_REG_MODAL,
    HIDE_BIZ_REG_MODAL
} from "../actions/modal"

export interface ModalState {
    loginModalVisible: boolean
    registerModalVisible: boolean
    bizRegModalVisible: boolean
}

const initialState: ModalState = {
    loginModalVisible: false,
    registerModalVisible: false,
    bizRegModalVisible: false
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
            case SHOW_BIZ_REG_MODAL:
                draft.bizRegModalVisible = true
                break
            case HIDE_BIZ_REG_MODAL:
                draft.bizRegModalVisible = false
                break
            default:
                break
        }
    })
}

export default modal
