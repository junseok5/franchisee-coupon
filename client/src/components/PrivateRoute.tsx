import * as React from "react"
import useOwnerInfo from "src/hooks/useOwnerInfo"
import { Route, Redirect } from "react-router-dom"

interface PrivateRouteProps {
    component: React.ComponentType<any>
    redirectTo: string
    path: string
    exact?: boolean
}

const PrivateRoute: React.SFC<PrivateRouteProps> = ({
    component: Component,
    redirectTo,
    path,
    exact
}) => {
    const { isLoggedIn } = useOwnerInfo()

    return (
        <Route
            path={path}
            exact={exact}
            render={(props: any) =>
                isLoggedIn ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={redirectTo} />
                )
            }
        />
    )
}

export default PrivateRoute
