

const port= 7500
const baseURL = `http://localhost:${port}/ugurv1/api/`
const apiType = {
    users:"users/",
    todos:"todos/"
}

export const apiGetAllTodos = {
    allTodos: baseURL +  apiType.todos + "all-todos"
}