import { useSelector, useDispatch } from "react-redux"
import { RootState } from "src/store/reducers"
import { useCallback } from "react"
import { REMOVE_ADVERTISEMENT_REQUEST } from "src/store/actions/advertisement"

export default function useRemoveAdvertisement() {
    const {
        isRemovingAdvertisement,
        advertisementRemoved,
        removeAdvertisementErrorMessage
    } = useSelector((state: RootState) => state.advertisement)
    const dispatch = useDispatch()

    const removeAdvertisement = useCallback(
        payload => dispatch({ type: REMOVE_ADVERTISEMENT_REQUEST, payload }),
        [dispatch]
    )

    return {
        isRemovingAdvertisement,
        advertisementRemoved,
        removeAdvertisementErrorMessage,
        removeAdvertisement
    } as {
        isRemovingAdvertisement: boolean
        advertisementRemoved: boolean
        removeAdvertisementErrorMessage: string
        removeAdvertisement: typeof removeAdvertisement
    }
}
