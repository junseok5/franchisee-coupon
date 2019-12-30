import { combineReducers } from "redux"
import modal, { ModalState } from "./modal"
import owner, { OwnerState } from "./owner"
import store, { StoreState } from "./store"
import advertisement, { AdvertisementState } from "./advertisement"

const rootReducer = combineReducers({
    modal,
    owner,
    store,
    advertisement
})

export default rootReducer

export interface RootState {
    modal: ModalState
    owner: OwnerState
    store: StoreState
    advertisement: AdvertisementState
}
