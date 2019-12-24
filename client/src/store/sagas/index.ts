import { all, fork } from "redux-saga/effects"
import ownerSaga from "./owner"
import storeSaga from "./store"

export default function* rootSaga() {
    yield all([fork(ownerSaga), fork(storeSaga)])
}
