

const port= 7500
const baseURL = `http://localhost:${port}/ugurv1/api/`
const apiType = {
    users:"users/",
    todos:"todos/"
}
const userTKN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTgzYTRmYzMwYmU3NmMwMGYzM2Y4NWIiLCJpYXQiOjE3MDMyMDI3OTgsImV4cCI6MTcwMzIwNjM5OH0.4Qa9_Al7Of8BDCneqAwvnGRKzUcVDw0Qh80A1qHeC8k"

export const ugurApiV1 = {
    getAllTodos: baseURL +  apiType.todos + "all-todos",
    getUserOfTodos: baseURL + apiType.todos + "user-todo"

}

export const userToken = {
    token : "Bearer " + userTKN
}