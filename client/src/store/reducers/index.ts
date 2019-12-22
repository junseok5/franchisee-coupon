import { combineReducers } from "redux"
import modal, { ModalState } from "./modal"
import owner, { OwnerState } from "./owner"

const rootReducer = combineReducers({
    modal,
    owner
})

export default rootReducer

export interface RootState {
    modal: ModalState
    owner: OwnerState
}
