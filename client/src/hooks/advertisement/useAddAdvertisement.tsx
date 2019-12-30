import { useSelector, useDispatch } from "react-redux"
import { RootState } from "src/store/reducers"
import { useCallback } from "react"
import { ADD_ADVERTISEMENT_REQUEST } from "src/store/actions/advertisement"

export default function useAddAdvertisement() {
    const {
        isAddingAdvertisement,
        addAdvertisementErrorMessage,
        advertisementAdded
    } = useSelector((state: RootState) => state.advertisement)
    const dispatch = useDispatch()

    const addAdvertisement = useCallback(
        payload => dispatch({ type: ADD_ADVERTISEMENT_REQUEST, payload }),
        [dispatch]
    )

    return {
        isAddingAdvertisement,
        addAdvertisementErrorMessage,
        advertisementAdded,
        addAdvertisement
    } as {
        isAddingAdvertisement: boolean
        addAdvertisementErrorMessage: string
        advertisementAdded: boolean
        addAdvertisement: typeof addAdvertisement
    }
}
