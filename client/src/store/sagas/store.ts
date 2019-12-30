import { all, call, put, takeEvery, takeLatest, fork } from "redux-saga/effects"
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
    ADD_BIZ_REG_IMG_REQUEST,
    LOAD_STORE_ADVERTISEMENTS_FAILURE,
    LOAD_STORE_ADVERTISEMENTS_SUCCESS,
    LOAD_STORE_ADVERTISEMENTS_REQUEST,
    UPDATE_STORE_FAILURE,
    UPDATE_STORE_REQUEST,
    UPDATE_STORE_SUCCESS,
    CHANGE_STORE_UPDATED,
    REMOVE_STORE_FAILURE,
    REMOVE_STORE_SUCCESS,
    CHANGE_STORE_REMOVED,
    REMOVE_STORE_REQUEST,
    LOAD_MAPS_GEOCODING_FAILURE,
    LOAD_MAPS_GEOCODING_SUCCESS,
    LOAD_MAPS_GEOCODING_REQUEST
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

function* loadStoreAdvertisements(action: any) {
    try {
        const result = yield call(
            storeAPI.loadStoreAdvertisements,
            action.payload
        )
        yield put({
            type: LOAD_STORE_ADVERTISEMENTS_SUCCESS,
            payload: result.data
        })
    } catch (e) {
        console.error(e)
        yield put({
            type: LOAD_STORE_ADVERTISEMENTS_FAILURE,
            payload: e.response && e.response.data
        })
    }
}

function* watchLoadStoreAdvertisements() {
    yield takeEvery(LOAD_STORE_ADVERTISEMENTS_REQUEST, loadStoreAdvertisements)
}

function* updateStore(action: any) {
    try {
        yield call(storeAPI.updateStore, action.payload)
        yield put({
            type: UPDATE_STORE_SUCCESS
        })
        yield put({
            type: CHANGE_STORE_UPDATED,
            payload: false
        })
    } catch (e) {
        console.error(e)
        yield put({
            type: UPDATE_STORE_FAILURE,
            payload: e.response && e.response.data
        })
    }
}

function* watchUpdateStore() {
    yield takeLatest(UPDATE_STORE_REQUEST, updateStore)
}

function* removeStore(action: any) {
    try {
        yield call(storeAPI.removeStore, action.payload)
        yield put({
            type: REMOVE_STORE_SUCCESS
        })
        yield put({
            type: CHANGE_STORE_REMOVED,
            payload: false
        })
    } catch (e) {
        console.error(e)
        yield put({
            type: REMOVE_STORE_FAILURE,
            payload: e.response && e.response.data
        })
    }
}

function* watchRemoveStore() {
    yield takeLatest(REMOVE_STORE_REQUEST, removeStore)
}

function* loadMapsGeocoding(action: any) {
    try {
        const result = yield call(storeAPI.loadMapsGeocoding, action.payload)
        yield put({
            type: LOAD_MAPS_GEOCODING_SUCCESS,
            payload: result.data.addresses
        })
    } catch (e) {
        console.error(e)
        yield put({
            type: LOAD_MAPS_GEOCODING_FAILURE,
            payload: e.response && e.response.data
        })
    }
}

function* watchLoadMapsGeocoding() {
    yield takeLatest(LOAD_MAPS_GEOCODING_REQUEST, loadMapsGeocoding)
}

export default function* storeSaga() {
    yield all([
        fork(watchAddStore),
        fork(watchLoadStore),
        fork(watchAddBizRegImg),
        fork(watchLoadStoreAdvertisements),
        fork(watchUpdateStore),
        fork(watchRemoveStore),
        fork(watchLoadMapsGeocoding)
    ])
}
