import { all, call, put, takeLatest, fork } from "redux-saga/effects"
import {
    LOG_IN_FAILURE,
    LOG_IN_SUCCESS,
    LOG_IN_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    REGISTER_REQUEST,
    CHECK_LOGGED_FAILURE,
    CHECK_LOGGED_SUCCESS,
    CHECK_LOGGED_REQUEST
} from "../actions/owner"
import * as ownerAPI from "../../api/owner"
import {
    GET_MY_STORE_LIST_FAILURE,
    GET_MY_STORE_LIST_SUCCESS,
    GET_MY_STORE_LIST_REQUEST
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

function* getMyStoreList(action: any) {
    try {
        const result = yield call(ownerAPI.getMyStores, action.payload)
        yield put({
            type: GET_MY_STORE_LIST_SUCCESS,
            payload: result.data
        })
    } catch (e) {
        console.error(e)
        yield put({
            type: GET_MY_STORE_LIST_FAILURE,
            payload: e.response && e.response.data
        })
    }
}

function* watchGetMyStoreList() {
    yield takeLatest(GET_MY_STORE_LIST_REQUEST, getMyStoreList)
}

export default function* ownerSaga() {
    yield all([
        fork(watchLogIn),
        fork(watchRegister),
        fork(watchCheckLogged),
        fork(watchGetMyStoreList)
    ])
}
