import { useSelector, useDispatch } from "react-redux"
import { RootState } from "src/store/reducers"
import { useCallback } from "react"
import { LOAD_STORE_ADVERTISEMENTS_REQUEST } from "src/store/actions/store"
import { LoadStoreAdvertisementsParams } from "src/api/store"

export default function useLoadStoreAdvertisements() {
    const {
        isLoadingStoreAdvertisements,
        storeAdvertisements,
        loadStoreAdvertisementsErrorMessage
    } = useSelector((state: RootState) => state.store)
    const dispatch = useDispatch()

    const loadStoreAdvertisements = useCallback(
        (payload: LoadStoreAdvertisementsParams) =>
            dispatch({ type: LOAD_STORE_ADVERTISEMENTS_REQUEST, payload }),
        [dispatch]
    )

    return {
        isLoadingStoreAdvertisements,
        storeAdvertisements,
        loadStoreAdvertisementsErrorMessage,
        loadStoreAdvertisements
    }
}
