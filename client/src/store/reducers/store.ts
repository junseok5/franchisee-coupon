import produce from "immer"
import {
    ADD_STORE_REQUEST,
    ADD_STORE_SUCCESS,
    ADD_STORE_FAILURE,
    CHANGE_STORE_ADDED
} from "../actions/store"

export interface StoreState {
    isAddingStore: boolean
    addStoreErrorMessage: string
    storeAdded: boolean
}

const initialState: StoreState = {
    isAddingStore: false, // 가맹점 등록 중
    addStoreErrorMessage: "", // 가맹점 등록 실패 메세지
    storeAdded: false // 가맹점 등록 성공
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
            default:
                break
        }
    })
}

export default store
