import { useSelector, useDispatch } from "react-redux"
import { RootState } from "src/store/reducers"
import { useCallback } from "react"
import { REMOVE_ADMIN_ADVERTISEMENT_REQUEST } from "src/store/actions/admin"

export default function useRemoveAdvertisements() {
    const {
        isRemovedAdvertisement,
        isRemovingAdvertisement,
        removeAdvertisementErrorMessage
    } = useSelector((state: RootState) => state.admin)
    const dispatch = useDispatch()

    const removeAdvertisements = useCallback(
        (payload: number | string) =>
            dispatch({ type: REMOVE_ADMIN_ADVERTISEMENT_REQUEST, payload }),
        [dispatch]
    )

    return {
        isRemovedAdvertisement,
        isRemovingAdvertisement,
        removeAdvertisementErrorMessage,
        removeAdvertisements
    }
}
