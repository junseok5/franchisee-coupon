import { all, call, put, takeLatest, fork } from "redux-saga/effects"
import * as storeAPI from "../../api/store"
import {
    ADD_STORE_FAILURE,
    ADD_STORE_SUCCESS,
    ADD_STORE_REQUEST,
    CHANGE_STORE_ADDED,
    LOAD_STORE_FAILURE,
    LOAD_STORE_SUCCESS,
    LOAD_STORE_REQUEST,
    ADD_BIZ_REG_IMG_FAILURE,
    ADD_BIZ_REG_IMG_SUCCESS,
    CHANGE_ADDED_BIZ_REG_IMG,
    ADD_BIZ_REG_IMG_REQUEST
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

function* loadStore(action: any) {
    try {
        const result = yield call(storeAPI.loadStore, action.payload)
        yield put({
            type: LOAD_STORE_SUCCESS,
            payload: result.data
        })
    } catch (e) {
        console.error(e)
        yield put({
            type: LOAD_STORE_FAILURE,
            payload: e.response && e.response.data
        })
    }
}

function* watchLoadStore() {
    yield takeLatest(LOAD_STORE_REQUEST, loadStore)
}

function* addBizRegImg(action: any) {
    try {
        const result = yield call(storeAPI.addBizRegImg, action.payload)
        yield put({
            type: ADD_BIZ_REG_IMG_SUCCESS,
            payload: result.data
        })
        yield put({
            type: CHANGE_ADDED_BIZ_REG_IMG,
            payload: false
        })
    } catch (e) {
        console.error(e)
        yield put({
            type: ADD_BIZ_REG_IMG_FAILURE,
            payload: e.response && e.response.data
        })
    }
}

function* watchAddBizRegImg() {
    yield takeLatest(ADD_BIZ_REG_IMG_REQUEST, addBizRegImg)
}

export default function* storeSaga() {
    yield all([
        fork(watchAddStore),
        fork(watchLoadStore),
        fork(watchAddBizRegImg)
    ])
}
