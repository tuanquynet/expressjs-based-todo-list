import {  /*put, call,*/ fork } from 'redux-saga/effects';
import {doFetch as fetch} from '../helpers/request';
import {
	getTodoFlow,
	addTodoFlow,
	deleteTodoFlow,
	updateTodoFlow,
} from './todo';

export function fetchApi(url) {
	return fetch( url )
		.then(response => response.json() )
		.then(json => json);
}

export function* startup() {
	yield console.log('Hello Redux-Saga');
}

export default function* root() {
	// combine your saga here
	yield fork(startup);
	yield fork(getTodoFlow);
	yield fork(addTodoFlow);
	yield fork(deleteTodoFlow);
	yield fork(updateTodoFlow);
}
