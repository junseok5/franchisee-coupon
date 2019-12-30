import { useSelector, useDispatch } from "react-redux"
import { RootState } from "src/store/reducers"
import { useCallback } from "react"
import { CHANGE_LAT } from "src/store/actions/store"

export default function useLat() {
    const { lat } = useSelector((state: RootState) => state.store)
    const dispatch = useDispatch()

    const changeLat = useCallback(
        payload => dispatch({ type: CHANGE_LAT, payload }),
        [dispatch]
    )

    return {
        lat,
        changeLat
    } as {
        lat: number
        changeLat: typeof changeLat
    }
}
