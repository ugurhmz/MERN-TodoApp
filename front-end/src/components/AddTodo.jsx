import React, { useState } from 'react'

function AddTodo() {
  const [todoName, setTodoName] = useState("")

  return (
    <>
      <div className='form-input-container'>
        <input value={todoName} className="form-input" placeholder="Add todo..." 
               onChange={e => setTodoName(e.target.value)} />
        <button type="button" className='form-btn'>Add</button>
      </div>
    </>
  )
}

export default AddTodo