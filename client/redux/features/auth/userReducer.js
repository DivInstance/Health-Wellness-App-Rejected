import {createReducer} from '@reduxjs/toolkit'

//https://www.youtube.com/watch?v=1mUp9YZQGFE&list=PLuHGmgpyHfRzZy2xPF2Vn68sprpaZmCTV&index=42

export const userReducer = createReducer({},(builder) => {
    builder.addCase("loginRequest",(state,action)  =>{
        state.loading = true;
    })
    builder.addCase("loginSuccess",(state,action)  =>{
        state.loading = false;
        state.message = action.payload;
        state.isAuthenticated = true;
    })
    builder.addCase("loginFailure",(state,action)  =>{
        state.isAuthenticated = false;
        state.error = action.payload;   
    })
    builder.addCase('clearError',(state)=>{ //https://youtu.be/1mUp9YZQGFE?list=PLuHGmgpyHfRzZy2xPF2Vn68sprpaZmCTV&t=1638   
        state.error = null;
    })
    builder.addCase('clearMessage',(state)=>{
        state.message = null;
    })
})

