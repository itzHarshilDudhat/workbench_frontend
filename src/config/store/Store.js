import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slice/AuthSlice";
import commonReducer from "../slice/CommonSlice";

export const store = configureStore({
    reducer: {
        common: commonReducer,
        auth: authReducer
    }
})