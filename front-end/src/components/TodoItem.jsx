import React from 'react'


function TodoItem(props) {
  return (
    <>
        <p className="todo-item">
            <input type="checkbox" value="" />
            <label htmlFor=""> { props.title }</label>
            <button type='button' className='btn-delete'>Delete</button>
        </p>
    </>
  )
}

export default TodoItem