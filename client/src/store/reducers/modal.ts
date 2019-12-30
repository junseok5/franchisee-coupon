import produce from "immer"
import {
    SHOW_REGISTER_MODAL,
    HIDE_REGISTER_MODAL,
    SHOW_LOGIN_MODAL,
    HIDE_LOGIN_MODAL,
    SHOW_BIZ_REG_MODAL,
    HIDE_BIZ_REG_MODAL,
    SHOW_ADVERTISEMENT_ADD_MODAL,
    HIDE_ADVERTISEMENT_ADD_MODAL,
    SHOW_GEOCODING_MODAL,
    HIDE_GEOCODING_MODAL,
    SHOW_SPECIAL_DETAIL_MODAL,
    HIDE_SPECIAL_DETAIL_MODAL,
    SHOW_COUPON_DETAIL_MODAL,
    HIDE_COUPON_DETAIL_MODAL
} from "../actions/modal"

export interface ModalState {
    loginModalVisible: boolean
    registerModalVisible: boolean
    bizRegModalVisible: boolean
    advertisementAddModalVisible: boolean
    geocodingModalVisible: boolean
    specialDetailModalVisible: boolean
    couponDetailModalVisible: boolean
}

const initialState: ModalState = {
    loginModalVisible: false,
    registerModalVisible: false,
    bizRegModalVisible: false,
    advertisementAddModalVisible: false,
    geocodingModalVisible: false,
    specialDetailModalVisible: false,
    couponDetailModalVisible: false
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
            case SHOW_ADVERTISEMENT_ADD_MODAL:
                draft.advertisementAddModalVisible = true
                break
            case HIDE_ADVERTISEMENT_ADD_MODAL:
                draft.advertisementAddModalVisible = false
                break
            case SHOW_GEOCODING_MODAL:
                draft.geocodingModalVisible = true
                break
            case HIDE_GEOCODING_MODAL:
                draft.geocodingModalVisible = false
                break
            case SHOW_SPECIAL_DETAIL_MODAL:
                draft.specialDetailModalVisible = true
                break
            case HIDE_SPECIAL_DETAIL_MODAL:
                draft.specialDetailModalVisible = false
                break
            case SHOW_COUPON_DETAIL_MODAL:
                draft.couponDetailModalVisible = true
                break
            case HIDE_COUPON_DETAIL_MODAL:
                draft.couponDetailModalVisible = false
                break
            default:
                break
        }
    })
}

export default modal
