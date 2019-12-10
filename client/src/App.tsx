import * as React from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import { PAGE_PATHS } from "./constants"
import Home from "./pages/Home"

class App extends React.Component {
    public render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path={PAGE_PATHS.HOME} component={Home} />
                </Switch>
            </BrowserRouter>
        )
    }
}

export default App
