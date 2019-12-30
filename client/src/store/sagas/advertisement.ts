import { all, call, put, takeLatest, takeEvery, fork } from "redux-saga/effects"
import * as advertisementAPI from "../../api/advertisement"
import {
    ADD_ADVERTISEMENT_SUCCESS,
    CHANGE_ADDED_ADVERTISEMENT,
    ADD_ADVERTISEMENT_FAILURE,
    ADD_ADVERTISEMENT_REQUEST,
    UPDATE_ADVERTISEMENT_FAILURE,
    UPDATE_ADVERTISEMENT_SUCCESS,
    CHANGE_ADVERTISEMENT_UPDATED,
    UPDATE_ADVERTISEMENT_REQUEST,
    REMOVE_ADVERTISEMENT_FAILURE,
    REMOVE_ADVERTISEMENT_SUCCESS,
    CHANGE_ADVERTISEMENT_REMOVED,
    REMOVE_ADVERTISEMENT_REQUEST,
    LOAD_ADVERTISEMENTS_FAILURE,
    LOAD_ADVERTISEMENTS_SUCCESS,
    LOAD_ADVERTISEMENTS_REQUEST
} from "../actions/advertisement"

function* addAdvertisement(action: any) {
    try {
        yield call(advertisementAPI.addAdvertisement, action.payload)
        yield put({
            type: ADD_ADVERTISEMENT_SUCCESS
        })
        yield put({
            type: CHANGE_ADDED_ADVERTISEMENT,
            payload: false
        })
    } catch (e) {
        console.error(e)
        yield put({
            type: ADD_ADVERTISEMENT_FAILURE,
            payload: e.response && e.response.data
        })
    }
}

function* watchAddAdvertisement() {
    yield takeLatest(ADD_ADVERTISEMENT_REQUEST, addAdvertisement)
}

function* updateAdvertisement(action: any) {
    try {
        yield call(advertisementAPI.updateAdvertisement, action.payload)
        yield put({
            type: UPDATE_ADVERTISEMENT_SUCCESS
        })
        yield put({
            type: CHANGE_ADVERTISEMENT_UPDATED,
            payload: false
        })
    } catch (e) {
        console.error(e)
        yield put({
            type: UPDATE_ADVERTISEMENT_FAILURE,
            payload: e.response && e.response.data
        })
    }
}

function* watchUpdateAdvertisement() {
    yield takeLatest(UPDATE_ADVERTISEMENT_REQUEST, updateAdvertisement)
}

function* removeAdvertisement(action: any) {
    try {
        yield call(advertisementAPI.removeAdvertisement, action.payload)
        yield put({
            type: REMOVE_ADVERTISEMENT_SUCCESS
        })
        yield put({
            type: CHANGE_ADVERTISEMENT_REMOVED,
            payload: false
        })
    } catch (e) {
        console.error(e)
        yield put({
            type: REMOVE_ADVERTISEMENT_FAILURE,
            payload: e.response && e.response.data
        })
    }
}

function* watchRemoveAdvertisement() {
    yield takeLatest(REMOVE_ADVERTISEMENT_REQUEST, removeAdvertisement)
}

function* loadAdvertisements(action: any) {
    try {
        const result = yield call(
            advertisementAPI.loadAdvertisements,
            action.payload
        )
        yield put({
            type: LOAD_ADVERTISEMENTS_SUCCESS,
            payload: result.data
        })
    } catch (e) {
        console.error(e)
        yield put({
            type: LOAD_ADVERTISEMENTS_FAILURE,
            payload: e.response && e.response.data
        })
    }
}

function* watchLoadAdvertisements() {
    yield takeEvery(LOAD_ADVERTISEMENTS_REQUEST, loadAdvertisements)
}

export default function* advertisementSaga() {
    yield all([
        fork(watchAddAdvertisement),
        fork(watchUpdateAdvertisement),
        fork(watchRemoveAdvertisement),
        fork(watchLoadAdvertisements)
    ])
}
