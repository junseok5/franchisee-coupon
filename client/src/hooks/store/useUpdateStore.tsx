import { useSelector, useDispatch } from "react-redux"
import { RootState } from "src/store/reducers"
import { useCallback } from "react"
import { UPDATE_STORE_REQUEST } from "src/store/actions/store"
import { UpdateStoreParams } from "src/api/store"

export default function useUpdateStore() {
    const {
        isUpdatingStore,
        updateStoreErrorMessage,
        storeUpdated
    } = useSelector((state: RootState) => state.store)
    const dispatch = useDispatch()

    const updateStore = useCallback(
        (payload: UpdateStoreParams) =>
            dispatch({ type: UPDATE_STORE_REQUEST, payload }),
        [dispatch]
    )

    return {
        isUpdatingStore,
        updateStoreErrorMessage,
        storeUpdated,
        updateStore
    }
}
