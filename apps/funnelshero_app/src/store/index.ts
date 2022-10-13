import * as Redux from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import {} from "./reducers";

export const store = configureStore({
    reducer: {
        // REDUCERS
    },
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useDispatch = () => Redux.useDispatch<AppDispatch>();
export const useSelector: Redux.TypedUseSelectorHook<RootState> =
    Redux.useSelector;
