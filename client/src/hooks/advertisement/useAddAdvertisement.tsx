import { useSelector, useDispatch } from "react-redux"
import { RootState } from "src/store/reducers"
import { useCallback } from "react"
import { ADD_ADVERTISEMENT_REQUEST } from "src/store/actions/advertisement"
import { AddAdvertisementParams } from "src/api/advertisement"

export default function useAddAdvertisement() {
    const {
        isAddingAdvertisement,
        addAdvertisementErrorMessage,
        advertisementAdded
    } = useSelector((state: RootState) => state.advertisement)
    const dispatch = useDispatch()

    const addAdvertisement = useCallback(
        (payload: AddAdvertisementParams) =>
            dispatch({ type: ADD_ADVERTISEMENT_REQUEST, payload }),
        [dispatch]
    )

    return {
        isAddingAdvertisement,
        addAdvertisementErrorMessage,
        advertisementAdded,
        addAdvertisement
    }
}
