import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: 'auth',
    initialState:{
        // user: null,
        user: localStorage.getItem("access") || null,
    },
    reducers:{
        setUser: (state,action)=>{
            state.user = action.payload;
            localStorage.setItem("access", action.payload);
        },
        removeUser: (state)=>{
            state.user = null;
            localStorage.removeItem("access");
        },
    }
});

export const {setUser, removeUser} = authSlice.actions

export default authSlice.reducer;