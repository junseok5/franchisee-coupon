import { useSelector, useDispatch } from "react-redux"
import { RootState } from "src/store/reducers"
import { useCallback } from "react"
import { REMOVE_ADMIN_ADVERTISEMENT_REQUEST } from "src/store/actions/admin"
import { RemoveAdvertisementBody } from "src/api/admin"

export default function useRemoveAdminAdvertisement() {
    const {
        isRemovedAdvertisement,
        isRemovingAdvertisement,
        removeAdvertisementErrorMessage
    } = useSelector((state: RootState) => state.admin)
    const dispatch = useDispatch()

    const removeAdvertisement = useCallback(
        (payload: RemoveAdvertisementBody) =>
            dispatch({ type: REMOVE_ADMIN_ADVERTISEMENT_REQUEST, payload }),
        [dispatch]
    )

    return {
        isRemovedAdvertisement,
        isRemovingAdvertisement,
        removeAdvertisementErrorMessage,
        removeAdvertisement
    }
}
