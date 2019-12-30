import { useSelector, useDispatch } from "react-redux"
import { RootState } from "src/store/reducers"
import { useCallback } from "react"
import { CHANGE_LNG } from "src/store/actions/store"

export default function useLng() {
    const { lng } = useSelector((state: RootState) => state.store)
    const dispatch = useDispatch()

    const changeLng = useCallback(
        payload => dispatch({ type: CHANGE_LNG, payload }),
        [dispatch]
    )

    return {
        lng,
        changeLng
    } as {
        lng: number
        changeLng: typeof changeLng
    }
}
