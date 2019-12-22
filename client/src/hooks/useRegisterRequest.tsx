import { useSelector, useDispatch } from "react-redux"
import { RootState } from "src/store/reducers"
import { useCallback } from "react"
import { REGISTER_REQUEST } from "src/store/actions/owner"

interface RegisterPayload {
    id: string
    password: string
    email: string
    name: string
}

export default function useRegisterRequest() {
    const { isRegistering, isRegistered, registerErrorMessage } = useSelector(
        (state: RootState) => state.owner
    )
    const dispatch = useDispatch()

    const register = useCallback(
        (payload: RegisterPayload) =>
            dispatch({ type: REGISTER_REQUEST, payload }),
        [dispatch]
    )

    return {
        isRegistering,
        isRegistered,
        registerErrorMessage,
        register
    } as {
        isRegistering: boolean
        isRegistered: boolean
        registerErrorMessage: string
        register: typeof register
    }
}
