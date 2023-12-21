import { createContext, useState } from "react";

export const TodoContext  = createContext()

export const TodoProvider = ( props) => {
    const [todoArr, setTodoArr] = useState([])

    return (
        <TodoContext.Provider value={ [todoArr, setTodoArr] }>
            { props.children }
        </TodoContext.Provider>
    )
}