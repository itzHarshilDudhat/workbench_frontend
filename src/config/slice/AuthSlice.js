import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { catchResponse } from "../../assets/helper/Helper";
import { Api } from "../Api";
import { DataService } from "../DataService";

const initialState = {
    user: null,
    loading: false,
    token: null
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setToken: (state, action) => {
            localStorage.setItem("Token", action.payload)
            state.token = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
        authReset: (state, action) => {
            state.loading = false;
            state.token = null;
            state.user = null;
        }
    }
})

export const { setLoading, setToken, setUser, authReset } = authSlice.actions
export default authSlice.reducer

export const onLogin = (data, navigate) => {
    return async (dispatch) => {
        try {
            dispatch(setLoading(true))
            let urlencoded = new URLSearchParams()
            urlencoded.append("password", data.password)
            urlencoded.append("userName", data.userName)
            DataService.post(Api.User.Login, urlencoded)
                .then((response) => {
                    let res = response.data
                    dispatch(setToken(res.data[0].token))
                    dispatch(setUser(res.data[0].user))
                    toast(response.data.message)
                    dispatch(setLoading(false))
                    navigate("/")
                }).catch((err) => {
                    catchResponse(err)
                    dispatch(setLoading(false))
                });
        } catch (error) {
            catchResponse(error)
            dispatch(setLoading(false))
        }
    }
}
export const onSignup = (data, navigate) => {
    return async (dispatch) => {
        try {
            dispatch(setLoading(true))
            let urlencoded = new URLSearchParams()
            urlencoded.append("name", data.name)
            urlencoded.append("email", data.email)
            urlencoded.append("password", data.password)
            urlencoded.append("userName", data.userName)
            urlencoded.append("mobileNumber", data.mobileNumber)
            DataService.post(Api.User.SignUp, urlencoded)
                .then((response) => {
                    toast(response.data.message)
                    dispatch(setLoading(false))
                    navigate("/auth/login")
                }).catch((err) => {
                    catchResponse(err)
                    dispatch(setLoading(false))
                });
        } catch (error) {
            catchResponse(error)
            dispatch(setLoading(false))
        }
    }
}
export const onForgotPassword = (data, navigate) => {
    return async (dispatch) => {
        try {
            dispatch(setLoading(true))
            let urlencoded = new URLSearchParams()
            urlencoded.append("email", data.email)
            DataService.post(Api.User.ForgotPassword, urlencoded)
                .then((response) => {
                    toast(response.data.message)
                    dispatch(setLoading(false))
                    // navigate("/")
                }).catch((err) => {
                    catchResponse(err)
                    dispatch(setLoading(false))
                });
        } catch (error) {
            catchResponse(error)
            dispatch(setLoading(false))
        }
    }
}
export const onForgotChange = (data, navigate) => {
    return async (dispatch) => {
        try {
            dispatch(setLoading(true))
            let urlencoded = new URLSearchParams()
            urlencoded.append("newPassword", data.password)
            urlencoded.append("verificationString", data.verificationString)
            DataService.put(Api.User.ForgotChange, urlencoded)
                .then((response) => {
                    toast(response.data.message)
                    dispatch(setLoading(false))
                    navigate("/auth/login")
                }).catch((err) => {
                    catchResponse(err)
                    dispatch(setLoading(false))
                });
        } catch (error) {
            catchResponse(error)
            dispatch(setLoading(false))
        }
    }
}
export const onChangePassword = (data, navigate) => {
    return async (dispatch) => {
        try {
            dispatch(setLoading(true))
            let urlencoded = new URLSearchParams()
            urlencoded.append("newPassword", data.password)
            urlencoded.append("oldPassword", data.oldPassword)
            urlencoded.append("userName", data.userName)
            DataService.put(Api.User.ChangePassword, urlencoded)
                .then((response) => {
                    toast(response.data.message)
                    dispatch(setLoading(false))
                    navigate("/auth/login")
                }).catch((err) => {
                    catchResponse(err)
                    dispatch(setLoading(false))
                });
        } catch (error) {
            catchResponse(error)
            dispatch(setLoading(false))
        }
    }
}
export const onVerifyEmail = (verificationString, navigate) => {
    return async (dispatch) => {
        try {
            console.log(verificationString)
            dispatch(setLoading(true))
            let urlencoded = new URLSearchParams()
            urlencoded.append("verificationString", verificationString)
            DataService.put(Api.User.VerifyAccount, urlencoded)
                .then((response) => {
                    toast(response.data.message)
                    dispatch(setLoading(false))
                    navigate("/auth/login")
                }).catch((err) => {
                    catchResponse(err)
                    dispatch(setLoading(false))
                });
        } catch (error) {
            catchResponse(error)
            dispatch(setLoading(false))
        }
    }
}