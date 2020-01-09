import { all, call, put, takeEvery, takeLatest, fork } from "redux-saga/effects"
import * as adminAPI from "../../api/admin"
import {
    ADMIN_LOG_IN_FAILURE,
    ADMIN_LOG_IN_SUCCESS,
    ADMIN_LOG_IN_REQUEST,
    CHECK_ADMIN_LOGGED_SUCCESS,
    CHECK_ADMIN_LOGGED_FAILURE,
    CHECK_ADMIN_LOGGED_REQUEST,
    LOAD_VERIFICATION_STORES_FAILURE,
    LOAD_VERIFICATION_STORES_SUCCESS,
    LOAD_VERIFICATION_STORES_REQUEST,
    UPDATE_VERIFICATION_STORE_FAILURE,
    UPDATE_VERIFICATION_STORE_SUCCESS,
    CHANGE_IS_UPDATED_VERIFICATION_STORE,
    UPDATE_VERIFICATION_STORE_REQUEST,
    LOAD_ADMIN_ADVERTISEMENTS_FAILURE,
    LOAD_ADMIN_ADVERTISEMENTS_SUCCESS,
    LOAD_ADMIN_ADVERTISEMENTS_REQUEST,
    REMOVE_ADMIN_ADVERTISEMENT_FAILURE,
    REMOVE_ADMIN_ADVERTISEMENT_SUCCESS,
    CHANGE_IS_REMOVED_ADVERTISEMENT,
    REMOVE_ADMIN_ADVERTISEMENT_REQUEST
} from "../actions/admin"

function* adminLogIn(action: any) {
    try {
        const result = yield call(adminAPI.adminLogIn, action.payload)
        window.sessionStorage.setItem("a-jwt", result.data)
        yield put({
            type: ADMIN_LOG_IN_SUCCESS,
            payload: result.data
        })
    } catch (e) {
        console.error(e)
        yield put({
            type: ADMIN_LOG_IN_FAILURE,
            payload: e.response && e.response.data
        })
    }
}

function* watchAdminLogIn() {
    yield takeLatest(ADMIN_LOG_IN_REQUEST, adminLogIn)
}

function* adminCheckLogged(action: any) {
    try {
        yield call(adminAPI.adminCheckLogged, action.payload)
        yield put({
            type: CHECK_ADMIN_LOGGED_SUCCESS
        })
    } catch (e) {
        console.error(e)
        yield put({
            type: CHECK_ADMIN_LOGGED_FAILURE
        })
    }
}

function* watchAdminCheckLogged() {
    yield takeLatest(CHECK_ADMIN_LOGGED_REQUEST, adminCheckLogged)
}

function* loadVerificationStores(action: any) {
    try {
        const result = yield call(
            adminAPI.loadVerificationStores,
            action.payload
        )
        yield put({
            type: LOAD_VERIFICATION_STORES_SUCCESS,
            payload: result.data
        })
    } catch (e) {
        console.error(e)
        yield put({
            type: LOAD_VERIFICATION_STORES_FAILURE
        })
    }
}

function* watchLoadVerificationStores() {
    yield takeEvery(LOAD_VERIFICATION_STORES_REQUEST, loadVerificationStores)
}

function* updateVerificationStore(action: any) {
    try {
        const result = yield call(
            adminAPI.updateVerificationStore,
            action.payload
        )
        yield put({
            type: UPDATE_VERIFICATION_STORE_SUCCESS,
            payload: result.data
        })
        yield put({
            type: CHANGE_IS_UPDATED_VERIFICATION_STORE,
            payload: false
        })
    } catch (e) {
        console.error(e)
        yield put({
            type: UPDATE_VERIFICATION_STORE_FAILURE,
            payload: e.response && e.response.data
        })
    }
}

function* watchUpdateVerificationSTore() {
    yield takeLatest(UPDATE_VERIFICATION_STORE_REQUEST, updateVerificationStore)
}

function* loadAdvertisements(action: any) {
    try {
        const result = yield call(adminAPI.loadAdvertisements, action.payload)
        yield put({
            type: LOAD_ADMIN_ADVERTISEMENTS_SUCCESS,
            payload: result.data
        })
    } catch (e) {
        console.error(e)
        yield put({
            type: LOAD_ADMIN_ADVERTISEMENTS_FAILURE
        })
    }
}

function* watchLoadAdvertisements() {
    yield takeEvery(LOAD_ADMIN_ADVERTISEMENTS_REQUEST, loadAdvertisements)
}

function* removeAdvertisement(action: any) {
    try {
        yield call(adminAPI.removeAdvertisement, action.payload)
        yield put({
            type: REMOVE_ADMIN_ADVERTISEMENT_SUCCESS
        })
        yield put({
            type: CHANGE_IS_REMOVED_ADVERTISEMENT,
            payload: false
        })
    } catch (e) {
        console.error(e)
        yield put({
            type: REMOVE_ADMIN_ADVERTISEMENT_FAILURE,
            payload: e.response && e.response.data
        })
    }
}

function* watchRemoveAdvertisement() {
    yield takeLatest(REMOVE_ADMIN_ADVERTISEMENT_REQUEST, removeAdvertisement)
}

export default function* adminSaga() {
    yield all([
        fork(watchAdminLogIn),
        fork(watchAdminCheckLogged),
        fork(watchLoadVerificationStores),
        fork(watchUpdateVerificationSTore),
        fork(watchLoadAdvertisements),
        fork(watchRemoveAdvertisement)
    ])
}
