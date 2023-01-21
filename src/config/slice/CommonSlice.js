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
        setIsMobile: (state, value) => {
            state.isMobile = value
        },
        setIsLoading: (state, value) => {
            state.loading = value
        },
        setUser: (state, value) => {
            state.user = value
        }
    }
})
export const { setIsMobile } = CommonSlice.actions
export default CommonSlice.reducer