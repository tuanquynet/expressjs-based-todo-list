import React from 'react'
import PropTypes from 'prop-types'
import TodoTextInput from './TodoTextInput'
import config from '../config'

const Header = ({ addTodo, addTodoRequest }) => (
  <header className="header">
    <h1>todos</h1>
    <TodoTextInput
      newTodo
      onSave={(text) => {
        if (text.length !== 0) {
          addTodoRequest(`${config.apiUrl}/tasks`, {text})
        }
      }}
      placeholder="What needs to be done?"
    />
  </header>
)

Header.propTypes = {
  addTodo: PropTypes.func.isRequired
}

export default Header
