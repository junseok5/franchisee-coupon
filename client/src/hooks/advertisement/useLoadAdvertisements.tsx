import { useSelector, useDispatch } from "react-redux"
import { RootState } from "src/store/reducers"
import { useCallback } from "react"
import { LOAD_ADVERTISEMENTS_REQUEST } from "src/store/actions/advertisement"
import { LoadAdvertisementsParams } from "src/api/advertisement"

export default function useLoadAdvertisements() {
    const {
        isLoadingAdvertisements,
        loadAdvertisementsErrorMessage,
        advertisements
    } = useSelector((state: RootState) => state.advertisement)
    const dispatch = useDispatch()

    const loadAdvertisements = useCallback(
        (payload: LoadAdvertisementsParams) =>
            dispatch({ type: LOAD_ADVERTISEMENTS_REQUEST, payload }),
        [dispatch]
    )

    return {
        isLoadingAdvertisements,
        loadAdvertisementsErrorMessage,
        advertisements,
        loadAdvertisements
    }
}
