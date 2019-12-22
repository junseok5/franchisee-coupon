import * as React from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import { PAGE_PATHS } from "./constants"
import HomePage from "./pages/HomePage"
import OwnerPage from "./pages/OwnerPage"

class App extends React.Component {
    public render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path={PAGE_PATHS.HOME} component={HomePage} />
                    <Route path={PAGE_PATHS.OWNER} component={OwnerPage} />
                </Switch>
            </BrowserRouter>
        )
    }
}

export default App
