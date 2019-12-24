import { useSelector, useDispatch } from "react-redux"
import { RootState } from "src/store/reducers"
import { useCallback } from "react"
import { ADD_STORE_REQUEST } from "src/store/actions/store"

export default function useAddStore() {
    const { isAddingStore, addStoreErrorMessage, storeAdded } = useSelector(
        (state: RootState) => state.store
    )
    const dispatch = useDispatch()

    const addStore = useCallback(
        payload => dispatch({ type: ADD_STORE_REQUEST, payload }),
        [dispatch]
    )

    return {
        isAddingStore,
        addStoreErrorMessage,
        addStore,
        storeAdded
    } as {
        isAddingStore: boolean
        addStoreErrorMessage: string
        addStore: typeof addStore
        storeAdded: boolean
    }
}
