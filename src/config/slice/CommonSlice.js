import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isMobile: false,
    loading: false,
    user: null,
}
export const CommonSlice = createSlice({
    name: "common",
    initialState,
    reducers: {
        setIsMobile: (state, action) => {
            state.isMobile = action.payload
        },
        setIsLoading: (state, action) => {
            state.loading = action.payload
        },
        setUser: (state, action) => {
            state.user = action.payload
        }
    }
})
export const { setIsMobile } = CommonSlice.actions
export default CommonSlice.reducer