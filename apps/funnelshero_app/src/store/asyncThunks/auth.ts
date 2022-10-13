import { createAsyncThunk } from "@reduxjs/toolkit";
import authApi from "../../api/authApi";
import { authActions } from "../reducers/auth";

export const login = createAsyncThunk(
    "auth/login",
    async ({}, { dispatch }) => {
        //.....
    }
);

export const getUser = createAsyncThunk(
    "auth/me",
    async (navigate, { dispatch }) => {
        dispatch(authActions.setLoading(true));
        //....
    }
);
