import * as React from "react"
import * as ReactDOM from "react-dom"
import App from "./App"
import "./index.css"
import store from "./store"
import registerServiceWorker from "./registerServiceWorker"
import { Provider } from "react-redux"

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root") as HTMLElement
)
registerServiceWorker()
