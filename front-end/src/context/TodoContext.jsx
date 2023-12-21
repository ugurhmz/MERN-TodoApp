import { createContext, useState, useEffect } from "react";
import { ugurApiV1, userToken } from "../utilities/endPoints";

export const TodoContext = createContext();

export const TodoProvider = (props) => {
    const [todoArr, setTodoArr] = useState([]);

    useEffect(() => {
        const fetchAllTodos = async () => {
            try {
                const token = userToken.token

                const response = await fetch(ugurApiV1.getUserOfTodos, {
                    headers: {
                        Authorization: token
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`)
                }

                const resData = await response.json();
                console.log("resData", resData.userTodos);
                setTodoArr(resData.userTodos);
            } catch (err) {
                console.log(err);
            }
        };

        fetchAllTodos();
    }, []); // token değiştiğinde yeniden çalışmasına gerek yok

    return (
        <TodoContext.Provider value={[todoArr, setTodoArr]}>
            {props.children}
        </TodoContext.Provider>
    );
};
