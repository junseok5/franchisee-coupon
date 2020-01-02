import { useSelector, useDispatch } from "react-redux"
import { RootState } from "src/store/reducers"
import { useCallback } from "react"
import { UPDATE_ADVERTISEMENT_REQUEST } from "src/store/actions/advertisement"
import { UpdateAdvertisementParams } from "src/api/advertisement"

export default function useUpdateAdvertisement() {
    const {
        isUpdatingAdvertisement,
        updateAdvertisementErrorMessage,
        advertisementUpdated
    } = useSelector((state: RootState) => state.advertisement)
    const dispatch = useDispatch()

    const updateAdvertisement = useCallback(
        (payload: UpdateAdvertisementParams) =>
            dispatch({ type: UPDATE_ADVERTISEMENT_REQUEST, payload }),
        [dispatch]
    )

    return {
        isUpdatingAdvertisement,
        updateAdvertisementErrorMessage,
        advertisementUpdated,
        updateAdvertisement
    }
}
