import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import TodoTextInput from './TodoTextInput'
import config from '../config';

export default class TodoItem extends Component {
  static propTypes = {
    todo: PropTypes.object.isRequired,
    updateTodoRequest: PropTypes.func.isRequired,
    // deleteTodo: PropTypes.func.isRequired,
    // completeTodo: PropTypes.func.isRequired,
    deleteTodoRequest: PropTypes.func.isRequired,
  }

  state = {
    editing: false
  }

  handleDoubleClick = () => {
    this.setState({ editing: true })
  }

  handleSave = (id, text) => {
    if (text.length === 0) {
      // this.props.deleteTodo(id)
      this.props.deleteTodoRequest(`${config.apiUrl}/tasks/${id}`);
    } else {
      this.props.updateTodoRequest(`${config.apiUrl}/tasks/${id}`, {text})
    }
    this.setState({ editing: false })
  }

  render() {
    const { todo, updateTodoRequest, deleteTodoRequest } = this.props

    let element
    if (this.state.editing) {
      element = (
        <TodoTextInput text={todo.text}
                       editing={this.state.editing}
                       onSave={(text) => this.handleSave(todo.id, text)} />
      )
    } else {
      element = (
        <div className="view">
          <input className="toggle"
                 type="checkbox"
                 checked={todo.completed}
                 onChange={() => updateTodoRequest(`${config.apiUrl}/tasks/${todo.id}`, {completed: !todo.completed})} />
          <label onDoubleClick={this.handleDoubleClick}>
            {todo.text}
          </label>
          <button className="destroy"
                  onClick={() => deleteTodoRequest(`${config.apiUrl}/tasks/${todo.id}`)} />
        </div>
      )
    }

    return (
      <li className={classnames({
        completed: todo.completed,
        editing: this.state.editing
      })}>
        {element}
      </li>
    )
  }
}
