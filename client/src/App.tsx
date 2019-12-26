import * as React from "react"
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom"
import { PAGE_PATHS } from "./constants"
import HomePage from "./pages/HomePage"
import OwnerPage from "./pages/OwnerPage"
import PrivateRoute from "./components/PrivateRoute"
import StoreEditor from "./pages/StoreEditor"
import StoreDetailPage from "./pages/StoreDetailPage"

class App extends React.Component {
    public render() {
        return (
            <BrowserRouter>
                <Switch>
                    <PrivateRoute
                        path={`${PAGE_PATHS.OWNER}/:id`}
                        redirectTo={PAGE_PATHS.HOME}
                        component={OwnerPage}
                    />
                    <PrivateRoute
                        path={`${PAGE_PATHS.STORE_EDITOR}`}
                        redirectTo={PAGE_PATHS.HOME}
                        component={StoreEditor}
                    />
                    <PrivateRoute
                        path={`${PAGE_PATHS.STORE_DETAIL}/:id`}
                        redirectTo={PAGE_PATHS.HOME}
                        component={StoreDetailPage}
                    />
                    <Route path={PAGE_PATHS.HOME} component={HomePage} />
                    <Redirect from={"/"} to={PAGE_PATHS.HOME} />
                </Switch>
            </BrowserRouter>
        )
    }
}

export default App
