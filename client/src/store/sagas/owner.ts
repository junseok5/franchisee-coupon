import { all, call, put, takeLatest, takeEvery, fork } from "redux-saga/effects"
import {
    LOG_IN_FAILURE,
    LOG_IN_SUCCESS,
    LOG_IN_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    REGISTER_REQUEST,
    CHECK_LOGGED_FAILURE,
    CHECK_LOGGED_SUCCESS,
    CHECK_LOGGED_REQUEST,
    CHANGE_IS_REGISTERED
} from "../actions/owner"
import * as ownerAPI from "../../api/owner"
import {
    LOAD_MY_STORES_SUCCESS,
    LOAD_MY_STORES_FAILURE,
    LOAD_MY_STORES_REQUEST
} from "../actions/owner"

function* logIn(action: any) {
    try {
        const result = yield call(ownerAPI.logIn, action.payload)
        window.sessionStorage.setItem("jwt", result.data.token)
        yield put({
            type: LOG_IN_SUCCESS,
            payload: result.data
        })
    } catch (e) {
        console.error(e)
        window.sessionStorage.removeItem("jwt")
        yield put({
            type: LOG_IN_FAILURE,
            payload: e.response && e.response.data
        })
    }
}

function* watchLogIn() {
    yield takeLatest(LOG_IN_REQUEST, logIn)
}

function* register(action: any) {
    try {
        const result = yield call(ownerAPI.register, action.payload)
        window.sessionStorage.setItem("jwt", result.data.token)
        yield put({
            type: REGISTER_SUCCESS,
            payload: result.data
        })
        yield put({
            type: CHANGE_IS_REGISTERED,
            payload: false
        })
    } catch (e) {
        console.error(e)
        yield put({
            type: REGISTER_FAILURE,
            payload: e.response && e.response.data
        })
    }
}

function* watchRegister() {
    yield takeLatest(REGISTER_REQUEST, register)
}

function* checkLogged(action: any) {
    try {
        const result = yield call(ownerAPI.checkLogged, action.payload)
        yield put({
            type: CHECK_LOGGED_SUCCESS,
            payload: result.data
        })
    } catch (e) {
        console.error(e)
        yield put({
            type: CHECK_LOGGED_FAILURE,
            payload: e.response && e.response.data
        })
    }
}

function* watchCheckLogged() {
    yield takeLatest(CHECK_LOGGED_REQUEST, checkLogged)
}

function* loadStores(action: any) {
    try {
        const result = yield call(ownerAPI.loadMyStores, action.payload)
        yield put({
            type: LOAD_MY_STORES_SUCCESS,
            payload: result.data
        })
    } catch (e) {
        console.error(e)
        yield put({
            type: LOAD_MY_STORES_FAILURE,
            payload: e.response && e.response.data
        })
    }
}

function* watchLoadStores() {
    yield takeEvery(LOAD_MY_STORES_REQUEST, loadStores)
}

export default function* ownerSaga() {
    yield all([
        fork(watchLogIn),
        fork(watchRegister),
        fork(watchCheckLogged),
        fork(watchLoadStores)
    ])
}
