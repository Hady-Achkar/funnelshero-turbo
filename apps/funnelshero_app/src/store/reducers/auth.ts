import { createSlice } from "@reduxjs/toolkit";
// import login from "../asyncThunks/auth";

const initialState = {
    isLoading: false,
    data: null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setUserData(state, action) {
            state.data = action.payload;
        },
        setLoading(state, action) {
            state.isLoading = action.payload;
        },
    },
});

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;
