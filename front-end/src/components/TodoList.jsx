import React, { useContext } from 'react'
import TodoItem from './TodoItem'
import { TodoContext } from '../context/TodoContext'

function TodoList() {
  const [todoArr, setTodoArr] = useContext(TodoContext)


  return (

    1 <= todoArr.length ? 
    todoArr.map( (item) => {
      return(
        <TodoItem key={ item.id } id= {item.id} title={item.todoname}/>
      )
    }) : (<h3> Todo not found, you can add...</h3>)
  )
}

export default TodoList