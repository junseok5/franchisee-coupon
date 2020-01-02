import { useSelector, useDispatch } from "react-redux"
import { RootState } from "src/store/reducers"
import { useCallback } from "react"
import { LOAD_STORE_REQUEST } from "src/store/actions/store"
import { LoadStoreParams } from "src/api/store"

export default function useLoadStore() {
    const { isLoadingStore, loadStoreErrorMessage, store } = useSelector(
        (state: RootState) => state.store
    )
    const dispatch = useDispatch()

    const loadStore = useCallback(
        (payload: LoadStoreParams) =>
            dispatch({ type: LOAD_STORE_REQUEST, payload }),
        [dispatch]
    )

    return {
        isLoadingStore,
        loadStoreErrorMessage,
        store,
        loadStore
    }
}
