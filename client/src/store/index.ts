import createSagaMiddleware from "redux-saga"
import { applyMiddleware, createStore } from "redux"
import rootReducer from "./reducers"
import rootSaga from "./sagas"

const sagaMiddleware = createSagaMiddleware()
const middlewares = [sagaMiddleware]
const enhancer = applyMiddleware(...middlewares)
const store = createStore(rootReducer, enhancer)

sagaMiddleware.run(rootSaga)

export default store
