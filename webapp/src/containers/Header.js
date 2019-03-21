import { connect } from 'react-redux'
import Header from '../components/Header'
import { addTodo, addTodoRequest } from '../actions'

export default connect(null, { addTodo, addTodoRequest })(Header)
