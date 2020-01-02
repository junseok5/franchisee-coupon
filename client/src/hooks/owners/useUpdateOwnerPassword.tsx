import { useSelector, useDispatch } from "react-redux"
import { RootState } from "src/store/reducers"
import { useCallback } from "react"
import { UpdateOwnerPasswordParams } from "src/api/owner"
import { UPDATE_OWNER_PASSWORD_REQUEST } from "src/store/actions/owner"

export default function useUpdateOwnerPassword() {
    const {
        isUpdatingOwnerPassword,
        isUpdatedOwnerPassword,
        updateOwnerPasswordErrorMessage
    } = useSelector((state: RootState) => state.owner)
    const dispatch = useDispatch()

    const updateOwnerPassword = useCallback(
        (payload: UpdateOwnerPasswordParams) =>
            dispatch({ type: UPDATE_OWNER_PASSWORD_REQUEST, payload }),
        [dispatch]
    )

    return {
        isUpdatingOwnerPassword,
        isUpdatedOwnerPassword,
        updateOwnerPasswordErrorMessage,
        updateOwnerPassword
    }
}
