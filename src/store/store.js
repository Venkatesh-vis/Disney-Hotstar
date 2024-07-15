import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../features/user/userSlice';
import movieReducer from '../features/movie/movieslice'

export default configureStore({
    reducer:{
       user:userReducer,
       movie:movieReducer
    },
    middleware:(getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck:false
    })
})