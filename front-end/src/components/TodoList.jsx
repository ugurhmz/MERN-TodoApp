import React, { useContext } from 'react'
import TodoItem from './TodoItem'
import { TodoContext } from '../context/TodoContext'

function TodoList() {
  const [myTodoArr] = useContext(TodoContext)


  return (

    1 <= myTodoArr.length ? 
    myTodoArr.map( (singleTodo) => {
      return(
        <TodoItem key={ singleTodo.id } id= {singleTodo.id} todoName={singleTodo.todoname}/>
      )
    }) : (<h3> Todo not found, you can add...</h3>)
  )
}

export default TodoList