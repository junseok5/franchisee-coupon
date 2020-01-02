import { useSelector, useDispatch } from "react-redux"
import { RootState } from "src/store/reducers"
import { useCallback } from "react"
import { LOG_IN_REQUEST, CHECK_LOGGED_REQUEST } from "src/store/actions/owner"
import { LogInBody } from "src/api/owner"

export default function useLogin() {
    const { isLoggingIn, loginErrorMessage } = useSelector(
        (state: RootState) => state.owner
    )
    const dispatch = useDispatch()

    const logIn = useCallback(
        (payload: LogInBody) => dispatch({ type: LOG_IN_REQUEST, payload }),
        [dispatch]
    )

    const checkLogged = useCallback(
        (payload: string) => dispatch({ type: CHECK_LOGGED_REQUEST, payload }),
        [dispatch]
    )

    return {
        isLoggingIn,
        loginErrorMessage,
        logIn,
        checkLogged
    }
}
