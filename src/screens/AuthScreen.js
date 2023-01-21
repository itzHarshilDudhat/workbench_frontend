import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logo from "../assets/images/Logo.png";
import LoadingScreen from "./LoadingScreen";

const AuthScreen = () => {
    const loading = useSelector((state) => state.auth.loading);
    let pathName = window.location.pathname;
    useEffect(() => {
        pathName = window.location.pathname;
    }, [window.location])

    return (
        <>
            <ToastContainer />
            <div className="main-auth-container">
                <div
                    className="auth-container"
                    style={{
                        height:
                            pathName === "/auth/signup"
                                ? "600px"
                                : pathName === "/auth/login"
                                    ? "325px"
                                    : pathName === "/auth/forgotPassword"
                                        ? "300px"
                                        : "325px",
                    }}
                >
                    <div className="left-auth-container">
                        <img src={Logo} alt="Workbenchh" className="auth-logo" />
                        <h2>Workbenchh</h2>
                    </div>
                    <div className="right-auth-container">
                        {loading === true ? <LoadingScreen /> : <Outlet />}
                    </div>
                </div>
            </div>
        </>
    );
};

export default AuthScreen;
