import React, { useContext, useEffect, useState } from 'react'
import TodoItem from './TodoItem'
import { TodoContext } from '../context/TodoContext'
import './TodoList.css'

function TodoList() {
  const [myTodoArr] = useContext(TodoContext)
  const [showHeader, setShowHeader] = useState(false)

  useEffect(() => {
    setShowHeader(myTodoArr.length >= 1)
  }, [myTodoArr])

  return (
    <div className={`todo-list-container ${showHeader ? '' : 'hidden'}`}>
      <h4>Your todos:</h4>
      {myTodoArr.map((singleTodo) => (
        <TodoItem key={singleTodo._id} id={singleTodo._id} todoName={singleTodo.todoTitle} />
      ))}
      {!showHeader && <h3>Todo not found, you can add...</h3>}
    </div>
  )
}

export default TodoList
