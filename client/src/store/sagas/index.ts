import { all, fork } from "redux-saga/effects"
import ownerSaga from "./owner"
import storeSaga from "./store"
import advertisementSaga from "./advertisement"

export default function* rootSaga() {
    yield all([fork(ownerSaga), fork(storeSaga), fork(advertisementSaga)])
}
