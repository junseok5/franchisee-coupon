import { useSelector, useDispatch } from "react-redux"
import { RootState } from "src/store/reducers"
import { useCallback } from "react"
import { LoadOwnerInfoParams } from "../../api/owner"
import { LOAD_OWNER_INFO_REQUEST } from "src/store/actions/owner"

export default function useLoadOwnerInfo() {
    const { isLoadingOwnerInfo, loadOwnerInfoErrorMessage, me } = useSelector(
        (state: RootState) => state.owner
    )
    const dispatch = useDispatch()

    const loadOwnerInfo = useCallback(
        (payload: LoadOwnerInfoParams) =>
            dispatch({ type: LOAD_OWNER_INFO_REQUEST, payload }),
        [dispatch]
    )

    return {
        isLoadingOwnerInfo,
        loadOwnerInfoErrorMessage,
        me,
        loadOwnerInfo
    }
}
