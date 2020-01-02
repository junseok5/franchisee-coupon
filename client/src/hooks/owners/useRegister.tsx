import { useSelector, useDispatch } from "react-redux"
import { RootState } from "src/store/reducers"
import { useCallback } from "react"
import { REGISTER_REQUEST } from "src/store/actions/owner"
import { RegisterBody } from "src/api/owner"

export default function useRegister() {
    const { isRegistering, isRegistered, registerErrorMessage } = useSelector(
        (state: RootState) => state.owner
    )
    const dispatch = useDispatch()

    const register = useCallback(
        (payload: RegisterBody) =>
            dispatch({ type: REGISTER_REQUEST, payload }),
        [dispatch]
    )

    return {
        isRegistering,
        isRegistered,
        registerErrorMessage,
        register
    }
}
