import React, { useContext, useState } from 'react'
import { TodoContext } from '../context/TodoContext'

function AddTodo() {
  const [todoName, setTodoName] = useState("")
  const [ todoArr, setTodoArr ] = useContext(TodoContext)

  const addMyTodo = (e) => {
     if ( todoName === '') {
        return;
     }

     const todoExample = [ ...todoArr, {
        id: Math.random() * 101,
        todoname: todoName,
        complted: false
     }]

     setTodoArr(todoExample)
  }

  return (
    <>
      <div className='form-input-container'>
        <input value={todoName} className="form-input" placeholder="Add todo..." 
               onChange={e => setTodoName(e.target.value)} />
        <button type="button" className='form-btn' onClick={addMyTodo}>Add</button>
      </div>
    </>
  )
}

export default AddTodo