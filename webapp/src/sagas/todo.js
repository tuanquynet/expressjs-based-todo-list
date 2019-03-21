import {take, call, put} from 'redux-saga/effects';
import {doFetch as fetch} from '../helpers/request';
import * as types from '../constants/ActionTypes'
// import appConfig from '../config';

function* getTodo(url) {
	yield put({type: types.SENDING_REQUEST, sending:true});

	try {
		let response = yield call(fetch, url);
		yield put({type:types.SENDING_REQUEST, sending: false});
		yield put({type:types.GET_TODO_COMPLETE, data:response});
		return response;
	} catch (error) {
		yield put({type: types.REQUEST_ERROR, error: error.message});
	}
}

export function* getTodoFlow() {
	const INFINITE = true;

	while (INFINITE) {
		let request = yield take(types.GET_TODO_REQUEST);
		let {url} = request;

		yield call(getTodo, url);
	}
}

function* addTodo(url, payload) {
	yield put({type: types.SENDING_REQUEST, sending:true});

	try {
		let response = yield call(fetch, url, {method: 'POST', body: JSON.stringify(payload)});
		yield put({type:types.SENDING_REQUEST, sending: false});
		yield put({type:types.ADD_TODO_COMPLETE, data:response});
		return response;
	} catch (error) {
		yield put({type: types.REQUEST_ERROR, error: error.message});
	}
}

export function* addTodoFlow() {
	const INFINITE = true;

	while (INFINITE) {
		let request = yield take(types.ADD_TODO_REQUEST);
		let {url, payload} = request;

		yield call(addTodo, url, payload);
	}
}

function* deleteTodo(url, payload) {
	yield put({type: types.SENDING_REQUEST, sending:true});

	try {
		let response = yield call(fetch, url, {method: 'DELETE'});
		yield put({type:types.SENDING_REQUEST, sending: false});
		yield put({type:types.DELETE_TODO_COMPLETE, data:response});
		return response;
	} catch (error) {
		yield put({type: types.REQUEST_ERROR, error: error.message});
	}
}

export function* deleteTodoFlow() {
	const INFINITE = true;

	while (INFINITE) {
		let request = yield take(types.DELETE_TODO_REQUEST);
		let {url, payload} = request;

		yield call(deleteTodo, url, payload);
	}
}

function* updateTodo(url, payload) {
	yield put({type: types.SENDING_REQUEST, sending:true});

	try {
		let response = yield call(fetch, url, {method: 'PATCH', body: JSON.stringify(payload)});
		yield put({type:types.SENDING_REQUEST, sending: false});
		yield put({type:types.UPDATE_TODO_COMPLETE, data:response});
		return response;
	} catch (error) {
		yield put({type: types.REQUEST_ERROR, error: error.message});
	}
}

export function* updateTodoFlow() {
	const INFINITE = true;

	while (INFINITE) {
		let request = yield take(types.UPDATE_TODO_REQUEST);
		let {url, payload} = request;

		yield call(updateTodo, url, payload);
	}
}
