import * as React from "react"
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom"
import { PAGE_PATHS } from "./constants"
import HomePage from "./pages/HomePage"
import OwnerPage from "./pages/OwnerPage"
import PrivateRoute from "./components/etc/PrivateRoute"
import StoreEditorPage from "./pages/StoreEditorPage"
import StoreDetailPage from "./pages/StoreDetailPage"
import AdvertisementEditorPage from "./pages/AdvertisementEditorPage"

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
                        path={`${PAGE_PATHS.STORE_EDITOR}/:id`}
                        redirectTo={PAGE_PATHS.HOME}
                        component={StoreEditorPage}
                    />
                    <PrivateRoute
                        path={`${PAGE_PATHS.STORE_EDITOR}`}
                        redirectTo={PAGE_PATHS.HOME}
                        component={StoreEditorPage}
                    />
                    <PrivateRoute
                        path={`${PAGE_PATHS.STORE_DETAIL}/:id`}
                        redirectTo={PAGE_PATHS.HOME}
                        component={StoreDetailPage}
                    />
                    <PrivateRoute
                        path={`${PAGE_PATHS.ADVERTISEMENT_EDITOR}/stores/:storeId/ads/:id`}
                        redirectTo={PAGE_PATHS.HOME}
                        component={AdvertisementEditorPage}
                    />
                    <PrivateRoute
                        path={`${PAGE_PATHS.ADVERTISEMENT_EDITOR}/stores/:storeId`}
                        redirectTo={PAGE_PATHS.HOME}
                        component={AdvertisementEditorPage}
                    />
                    <Route
                        path={`${PAGE_PATHS.HOME}:storeId/categories/:category`}
                        component={HomePage}
                    />
                    <Route
                        path={`${PAGE_PATHS.HOME}categories/:category`}
                        component={HomePage}
                    />
                    <Route
                        path={`${PAGE_PATHS.HOME}:storeId`}
                        component={HomePage}
                    />
                    <Route
                        exact={true}
                        path={PAGE_PATHS.HOME}
                        component={HomePage}
                    />
                    <Redirect from={"/"} to={PAGE_PATHS.HOME} />
                </Switch>
            </BrowserRouter>
        )
    }
}

export default App
