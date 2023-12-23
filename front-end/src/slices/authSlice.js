import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userDatas: localStorage.getItem('userDatas') ? 
               JSON.parse(localStorage.getItem('userDatas')) : null
}

const authSlice = createSlice({
     name:'auth',
     initialState,
     reducers:{
        setCredentials: (state, action) => {
            state.userDatas = action.payload
            localStorage.setItem('userDatas', JSON.stringify(action.payload))
        },
        logout:(state, action) => {
            state.userDatas = null
            localStorage.removeItem('userDatas')
        }
     }
})
export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;