import { useSelector, useDispatch } from "react-redux"
import { RootState } from "src/store/reducers"
import { useCallback } from "react"
import { LOAD_ADVERTISEMENTS_REQUEST } from "src/store/actions/advertisement"
import { IAdvertisement } from "src/store/reducers/store"

export default function useLoadAdvertisements() {
    const {
        isLoadingAdvertisements,
        loadAdvertisementsErrorMessage,
        advertisements
    } = useSelector((state: RootState) => state.advertisement)
    const dispatch = useDispatch()

    const loadAdvertisements = useCallback(
        payload => dispatch({ type: LOAD_ADVERTISEMENTS_REQUEST, payload }),
        [dispatch]
    )

    return {
        isLoadingAdvertisements,
        loadAdvertisementsErrorMessage,
        advertisements,
        loadAdvertisements
    } as {
        isLoadingAdvertisements: boolean
        loadAdvertisementsErrorMessage: string
        advertisements: IAdvertisement[]
        loadAdvertisements: typeof loadAdvertisements
    }
}
