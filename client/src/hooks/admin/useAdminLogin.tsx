import { useSelector, useDispatch } from "react-redux"
import { RootState } from "src/store/reducers"
import { useCallback } from "react"
import { AdminLogInBody } from "src/api/admin"
import {
    ADMIN_LOG_IN_REQUEST,
    CHECK_ADMIN_LOGGED_REQUEST
} from "src/store/actions/admin"

export default function useAdminLogin() {
    const {
        isAdminLoggingIn,
        isAdminLoggedIn,
        isCheckingAdminLogged,
        adminLoginErrorMessage,
        adminToken
    } = useSelector((state: RootState) => state.admin)
    const dispatch = useDispatch()

    const adminLogIn = useCallback(
        (payload: AdminLogInBody) =>
            dispatch({ type: ADMIN_LOG_IN_REQUEST, payload }),
        [dispatch]
    )

    const checkAdminLogged = useCallback(
        (payload: string) => dispatch({ type: CHECK_ADMIN_LOGGED_REQUEST, payload }),
        [dispatch]
    )

    return {
        isAdminLoggingIn,
        isAdminLoggedIn,
        isCheckingAdminLogged,
        adminLoginErrorMessage,
        adminToken,
        adminLogIn,
        checkAdminLogged
    }
}
