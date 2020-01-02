import { useDispatch } from "react-redux"
import { useCallback } from "react"
import { LOG_OUT } from "src/store/actions/owner"

export default function useLogOut() {
    const dispatch = useDispatch()

    const logOut = useCallback(
        (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            event.preventDefault()

            window.sessionStorage.removeItem("jwt")
            dispatch({ type: LOG_OUT })
        },
        [dispatch]
    )

    return {
        logOut
    }
}
