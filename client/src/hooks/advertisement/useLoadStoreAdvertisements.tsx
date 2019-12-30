import { useSelector, useDispatch } from "react-redux"
import { RootState } from "src/store/reducers"
import { useCallback } from "react"
import { LOAD_STORE_ADVERTISEMENTS_REQUEST } from "src/store/actions/store"
import { IAdvertisement } from "src/store/reducers/store"

export default function useLoadStoreAdvertisements() {
    const {
        isLoadingStoreAdvertisements,
        storeAdvertisements,
        loadStoreAdvertisementsErrorMessage
    } = useSelector((state: RootState) => state.store)
    const dispatch = useDispatch()

    const loadStoreAdvertisements = useCallback(
        payload =>
            dispatch({ type: LOAD_STORE_ADVERTISEMENTS_REQUEST, payload }),
        [dispatch]
    )

    return {
        isLoadingStoreAdvertisements,
        storeAdvertisements,
        loadStoreAdvertisementsErrorMessage,
        loadStoreAdvertisements
    } as {
        isLoadingStoreAdvertisements: boolean
        storeAdvertisements: IAdvertisement[]
        loadStoreAdvertisementsErrorMessage: string
        loadStoreAdvertisements: typeof loadStoreAdvertisements
    }
}
