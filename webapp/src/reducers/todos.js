import {
  ADD_TODO,
  DELETE_TODO,
  EDIT_TODO,
  COMPLETE_TODO,
  COMPLETE_ALL_TODOS,
  CLEAR_COMPLETED,
  GET_TODO_COMPLETE,
  ADD_TODO_COMPLETE,
  DELETE_TODO_COMPLETE,
  UPDATE_TODO_COMPLETE,
} from '../constants/ActionTypes'

const initialState = [
  /* {
    text: 'Use Redux',
    completed: false,
    id: 'x0001'
  } */
]

export default function todos(state = initialState, action) {
  const tasks = [...state];
  switch (action.type) {
    case GET_TODO_COMPLETE:
      return [...state, ...action.data.tasks];
    case ADD_TODO_COMPLETE:
      return [
        ...state,
        {...action.data.task},
      ]
    case DELETE_TODO_COMPLETE:
      const taskId = action.data.task.id;
      const index = tasks.findIndex(task => task.id === taskId);
      tasks.splice(index, 1);

      return [
        ...tasks,
      ]
    case UPDATE_TODO_COMPLETE:
      const newTask = action.data.task;
      const finding = tasks.find(task => task.id === newTask.id);
      Object.assign(finding, newTask);

      return [
        ...tasks,
      ];

    case ADD_TODO:
      return [
        ...state,
        {
          // id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
          id: new Date().getTime().toString(),
          completed: false,
          text: action.text
        }
      ]

    case DELETE_TODO:
      return state.filter(todo =>
        todo.id !== action.id
      )

    case EDIT_TODO:
      return state.map(todo =>
        todo.id === action.id ?
          { ...todo, text: action.text } :
          todo
      )

    case COMPLETE_TODO:
      return state.map(todo =>
        todo.id === action.id ?
          { ...todo, completed: !todo.completed } :
          todo
      )

    case COMPLETE_ALL_TODOS:
      const areAllMarked = state.every(todo => todo.completed)
      return state.map(todo => ({
        ...todo,
        completed: !areAllMarked
      }))

    case CLEAR_COMPLETED:
      return state.filter(todo => todo.completed === false)

    default:
      return state
  }
}
