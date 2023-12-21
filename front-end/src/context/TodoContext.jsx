import { createContext, useState, useEffect } from "react";

export const TodoContext  = createContext()

export const TodoProvider = ( props) => {
    const [todoArr, setTodoArr] = useState([])

    
  useEffect(() => {
    
  }, []); 

    return (
        <TodoContext.Provider value={ [todoArr, setTodoArr] }>
            { props.children }
        </TodoContext.Provider>
    )
}