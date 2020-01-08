import { useSelector, useDispatch } from "react-redux"
import { RootState } from "src/store/reducers"
import { useCallback } from "react"
import { LOAD_VERIFICATION_STORES_REQUEST } from "src/store/actions/admin"

export default function useLoadVerificationStores() {
    const { isLoadingVerificationStores, verificationStores } = useSelector(
        (state: RootState) => state.admin
    )
    const dispatch = useDispatch()

    const loadVerificationStores = useCallback(
        () => dispatch({ type: LOAD_VERIFICATION_STORES_REQUEST }),
        [dispatch]
    )

    return {
        isLoadingVerificationStores,
        verificationStores,
        loadVerificationStores
    }
}
