import { createContext, useState, useEffect } from "react";
import { apiGetAllTodos } from "../utilities/endPoints";

export const TodoContext  = createContext()

export const TodoProvider = ( props) => {
    const [todoArr, setTodoArr] = useState([])

    
  useEffect(() => {
    const fetchAllTodos = async () => {
        try {
            const response = await fetch(apiGetAllTodos.allTodos)
            const resData = await response.json()

            console.log("resData",resData)
            setTodoArr(resData)
        } catch (err) {
            console.log(err)

        }
    };

    fetchAllTodos()

  }, [])

    return (
        <TodoContext.Provider value={ [todoArr, setTodoArr] }>
            { props.children }
        </TodoContext.Provider>
    )
}