import { combineReducers } from "redux"
import modal, { ModalState } from "./modal"
import owner, { OwnerState } from "./owner"
import store, { StoreState } from "./store"

const rootReducer = combineReducers({
    modal,
    owner,
    store
})

export default rootReducer

export interface RootState {
    modal: ModalState
    owner: OwnerState
    store: StoreState
}
