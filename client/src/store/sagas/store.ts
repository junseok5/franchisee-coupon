import { all, call, put, takeLatest, fork } from "redux-saga/effects"
import * as storeAPI from "../../api/store"
import {
    ADD_STORE_FAILURE,
    ADD_STORE_SUCCESS,
    ADD_STORE_REQUEST,
    CHANGE_STORE_ADDED
} from "../actions/store"

function* addStore(action: any) {
    try {
        const result = yield call(storeAPI.addStore, action.payload)
        yield put({
            type: ADD_STORE_SUCCESS,
            payload: result.data
        })
        yield put({
            type: CHANGE_STORE_ADDED,
            payload: false
        })
    } catch (e) {
        console.error(e)
        yield put({
            type: ADD_STORE_FAILURE,
            payload: e.response && e.response.data
        })
    }
}

function* watchAddStore() {
    yield takeLatest(ADD_STORE_REQUEST, addStore)
}

export default function* storeSaga() {
    yield all([fork(watchAddStore)])
}
