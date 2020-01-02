import { useSelector, useDispatch } from "react-redux"
import { RootState } from "src/store/reducers"
import { useCallback } from "react"
import { CHANGE_RADIUS } from "src/store/actions/advertisement"

export default function useRadius() {
    const { radius } = useSelector((state: RootState) => state.advertisement)
    const dispatch = useDispatch()

    const changeRadius = useCallback(
        (event: React.ChangeEvent<HTMLSelectElement>) =>
            dispatch({ type: CHANGE_RADIUS, payload: event.target.value }),
        [dispatch]
    )

    return {
        radius,
        changeRadius
    }
}
