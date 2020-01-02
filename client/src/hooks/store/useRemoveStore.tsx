import { useSelector, useDispatch } from "react-redux"
import { RootState } from "src/store/reducers"
import { useCallback } from "react"
import { REMOVE_STORE_REQUEST } from "src/store/actions/store"
import { RemoveStoreParams } from "src/api/store"

export default function useRemoveStore() {
    const {
        isRemovingStore,
        storeRemoved,
        removeStoreErrorMessage
    } = useSelector((state: RootState) => state.store)
    const dispatch = useDispatch()

    const removeStore = useCallback(
        (payload: RemoveStoreParams) =>
            dispatch({ type: REMOVE_STORE_REQUEST, payload }),
        [dispatch]
    )

    return {
        isRemovingStore,
        storeRemoved,
        removeStoreErrorMessage,
        removeStore
    }
}
