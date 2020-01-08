import { useSelector, useDispatch } from "react-redux"
import { RootState } from "src/store/reducers"
import { useCallback } from "react"
import { UpdateVerificationStoreBody } from "src/api/admin"
import { UPDATE_VERIFICATION_STORE_REQUEST } from "src/store/actions/admin"

export default function useUpdateVerificationStore() {
    const {
        isUpdatingVerificationStore,
        isUpdatedVerificationStore,
        updateVerificationStoreErrorMessage
    } = useSelector((state: RootState) => state.admin)
    const dispatch = useDispatch()

    const updateVerificationStore = useCallback(
        (payload: UpdateVerificationStoreBody) =>
            dispatch({ type: UPDATE_VERIFICATION_STORE_REQUEST, payload }),
        [dispatch]
    )

    return {
        isUpdatingVerificationStore,
        isUpdatedVerificationStore,
        updateVerificationStoreErrorMessage,
        updateVerificationStore
    }
}
