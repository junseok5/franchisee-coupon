import { useSelector, useDispatch } from "react-redux"
import { RootState } from "src/store/reducers"
import { useCallback } from "react"
import { UpdateOwnerInfoParams } from "../../api/owner"
import { UPDATE_OWNER_INFO_REQUEST } from "src/store/actions/owner"

export default function useUpdateOwnerInfo() {
    const {
        isUpdatingOwnerInfo,
        isUpdatedOwnerInfo,
        updateOwnerInfoErrorMessage
    } = useSelector((state: RootState) => state.owner)
    const dispatch = useDispatch()

    const updateOwnerInfo = useCallback(
        (payload: UpdateOwnerInfoParams) =>
            dispatch({ type: UPDATE_OWNER_INFO_REQUEST, payload }),
        [dispatch]
    )

    return {
        isUpdatingOwnerInfo,
        isUpdatedOwnerInfo,
        updateOwnerInfoErrorMessage,
        updateOwnerInfo
    }
}
