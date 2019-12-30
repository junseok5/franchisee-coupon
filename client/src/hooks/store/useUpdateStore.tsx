import { useSelector, useDispatch } from "react-redux"
import { RootState } from "src/store/reducers"
import { useCallback } from "react"
import { UPDATE_STORE_REQUEST } from "src/store/actions/store"

export default function useUpdateStore() {
    const {
        isUpdatingStore,
        updateStoreErrorMessage,
        storeUpdated
    } = useSelector((state: RootState) => state.store)
    const dispatch = useDispatch()

    const updateStore = useCallback(
        payload => dispatch({ type: UPDATE_STORE_REQUEST, payload }),
        [dispatch]
    )

    return {
        isUpdatingStore,
        updateStoreErrorMessage,
        storeUpdated,
        updateStore
    } as {
        isUpdatingStore: boolean
        updateStoreErrorMessage: string
        storeUpdated: boolean
        updateStore: typeof updateStore
    }
}
