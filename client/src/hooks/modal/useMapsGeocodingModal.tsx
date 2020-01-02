import { useSelector, useDispatch } from "react-redux"
import { RootState } from "src/store/reducers"
import { useCallback } from "react"
import {
    SHOW_GEOCODING_MODAL,
    HIDE_GEOCODING_MODAL
} from "src/store/actions/modal"

export default function useMapsGeocodingModal() {
    const { geocodingModalVisible } = useSelector(
        (state: RootState) => state.modal
    )
    const dispatch = useDispatch()

    const onShowGeocodingModal = useCallback(
        () => dispatch({ type: SHOW_GEOCODING_MODAL }),
        [dispatch]
    )
    const onHideGeocodingModal = useCallback(
        () => dispatch({ type: HIDE_GEOCODING_MODAL }),
        [dispatch]
    )

    return {
        geocodingModalVisible,
        onShowGeocodingModal,
        onHideGeocodingModal
    }
}
