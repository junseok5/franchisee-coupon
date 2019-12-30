import * as React from "react"
import useOwnerInfo from "src/hooks/owners/useOwnerInfo"
import useLoginRequest from "src/hooks/owners/useLogin"
import { useEffect } from "react"

interface CheckLoggedProps {}

const CheckLogged: React.SFC<CheckLoggedProps> = ({ children }) => {
    const { token, isLoggedIn, me } = useOwnerInfo()
    const { checkLogged } = useLoginRequest()

    useEffect(() => {
        if (isLoggedIn && !me) {
            checkLogged(token)
        }
    }, [])

    return <>{me ? children : null}</>
}

export default CheckLogged
