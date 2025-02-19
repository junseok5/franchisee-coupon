import { useSelector, useDispatch } from "react-redux"
import { RootState } from "src/store/reducers"
import { useCallback } from "react"
import { LOAD_MAPS_GEOCODING_REQUEST } from "src/store/actions/store"
import { LoadMapsGeocodingParams } from "src/api/store"

export default function useLoadMapsGeocoding() {
    const {
        isLoadingMapsGeocoding,
        mapsGeocoding,
        loadMapsGeocodingErrorMessage
    } = useSelector((state: RootState) => state.store)
    const dispatch = useDispatch()

    const loadMapsGeocoding = useCallback(
        (payload: LoadMapsGeocodingParams) =>
            dispatch({ type: LOAD_MAPS_GEOCODING_REQUEST, payload }),
        [dispatch]
    )

    return {
        isLoadingMapsGeocoding,
        mapsGeocoding,
        loadMapsGeocodingErrorMessage,
        loadMapsGeocoding
    }
}
