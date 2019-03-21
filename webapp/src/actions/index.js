import * as types from '../constants/ActionTypes'

export const getTodoRequest = (url) => ({ type: types.GET_TODO_REQUEST, url })
export const getTodoComplete = data => ({ type: types.GET_TODO_COMPLETE, data })
export const addTodoRequest = (url, payload) => ({ type: types.ADD_TODO_REQUEST, url, payload })
export const addTodoComplete = (data) => ({ type: types.ADD_TODO_COMPLETE, data })
export const deleteTodoRequest = (url) => ({ type: types.DELETE_TODO_REQUEST, url })
export const deleteTodoComplete = (data) => ({ type: types.DELETE_TODO_COMPLETE, data })
export const updateTodoRequest = (url, payload) => ({ type: types.UPDATE_TODO_REQUEST, url, payload })
export const updateTodoComplete = (data) => ({ type: types.UPDATE_TODO_COMPLETE, data })

export const addTodo = text => ({ type: types.ADD_TODO, text })
export const deleteTodo = id => ({ type: types.DELETE_TODO, id })
export const editTodo = (id, text) => ({ type: types.EDIT_TODO, id, text })
export const completeTodo = id => ({ type: types.COMPLETE_TODO, id })
export const completeAllTodos = () => ({ type: types.COMPLETE_ALL_TODOS })
export const clearCompleted = () => ({ type: types.CLEAR_COMPLETED })
export const setVisibilityFilter = filter => ({ type: types.SET_VISIBILITY_FILTER, filter})
