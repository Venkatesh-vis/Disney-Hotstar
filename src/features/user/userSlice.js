import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    name:"",
    email:"",
    photo:""
}

export const userSlice = createSlice({
    name:'user',
    initialState,
    reducers : {
         setUserLoginDetails: (state, action) => {
            state.name = action.payload.name
            state.email = action.payload.email
            state.photo = action.payload.photo
        },
        SetSignOutState: (state) => {
            state.name = null;
            state.email=null;
            state.photo = null
        }
    }
})

export const {setUserLoginDetails,SetSignOutState} = userSlice.actions;
export const selectUserName = state => state.user.name
export const selectUserEmail = state => state.user.email
export const selectUserPhoto = state => state.user.photo

export default userSlice.reducer