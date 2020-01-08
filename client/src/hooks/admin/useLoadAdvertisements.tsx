import { useSelector, useDispatch } from "react-redux"
import { RootState } from "src/store/reducers"
import { useCallback } from "react"
import { LOAD_ADMIN_ADVERTISEMENTS_REQUEST } from "src/store/actions/admin"

export default function useLoadAdvertisements() {
    const { isLoadingAdvertisements, advertisements } = useSelector(
        (state: RootState) => state.admin
    )
    const dispatch = useDispatch()

    const loadAdvertisements = useCallback(
        () => dispatch({ type: LOAD_ADMIN_ADVERTISEMENTS_REQUEST }),
        [dispatch]
    )

    return {
        isLoadingAdvertisements,
        advertisements,
        loadAdvertisements
    }
}
