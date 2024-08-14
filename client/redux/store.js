import { configureStore } from "@reduxjs/toolkit";
import { useReducer } from "./features/auth/userReducer";

export default configureStore()({
    reducer: {
        user: useReducer,
    }
})

//Host 
export const server = 'http://10.5.149.30:8080/api/v1/'

