import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slice/AuthSlice";
import commonReducer from "../slice/CommonSlice";
import DashboardReducer from "../slice/DashboardSlice";

export const store = configureStore({
    reducer: {
        common: commonReducer,
        auth: authReducer,
        dashboard: DashboardReducer
    }
})