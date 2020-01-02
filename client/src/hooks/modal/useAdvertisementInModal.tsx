import { useSelector, useDispatch } from "react-redux"
import { RootState } from "src/store/reducers"
import { useCallback } from "react"
import { CHANGE_ADVERTISEMENT_IN_MODAL } from "src/store/actions/advertisement"

export default function useAdvertisementInModal() {
    const { advertisementInModal } = useSelector(
        (state: RootState) => state.advertisement
    )
    const dispatch = useDispatch()

    const changeAdvertisementInModal = useCallback(
        payload => dispatch({ type: CHANGE_ADVERTISEMENT_IN_MODAL, payload }),
        [dispatch]
    )

    return {
        advertisementInModal,
        changeAdvertisementInModal
    }
}
