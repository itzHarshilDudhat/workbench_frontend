import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    collapsed: false,
    isMobile: true,
    user: null,
    loading: false
}
const dashboardSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers: {
        setIsCollapsed: (state, action) => {
            state.collapsed = action.payload
        },
        setIsMobile: (state, action) => {
            state.isMobile = action.payload
        },
        setLoading: (state, action) => {
            state.loading = action.payload
        },
        setUser: (state, action) => {
            state.user = action.payload
        },
    }
})

export const { setIsCollapsed, setIsMobile, setLoading, setUser } = dashboardSlice.actions
export default dashboardSlice.reducer