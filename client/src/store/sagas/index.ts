import { all, fork } from "redux-saga/effects"
import ownerSaga from "./owner"

export default function* rootSaga() {
    yield all([fork(ownerSaga)])
}
