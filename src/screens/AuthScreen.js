import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logo from "../assets/images/Logo.png";
import { setIsMobile } from "../config/slice/CommonSlice";
import LoadingScreen from "./LoadingScreen";

const AuthScreen = () => {
    const loading = useSelector((state) => state.auth.loading);
    const location = useLocation();
    let pathName = location.pathname;
    const dispatch = useDispatch();
    const [widthWindow, setWidth] = useState(window.innerWidth);
    useEffect(() => {
        function handleResize() {
            setWidth(window.innerWidth);
        }
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [widthWindow]);
    let isMobile = useSelector((state) => state.common.isMobile)
    const { innerWidth: width } = window;
    useEffect(() => {
        if (width < 700) {
            dispatch(setIsMobile(true))
        } else {
            dispatch(setIsMobile(false))
        }
    }, [widthWindow])

    useEffect(() => {
        pathName = location.pathname;
    }, [location])

    return (
        <>
            <ToastContainer />
            <div className="main-auth-container">
                {isMobile === false ?
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
                    :

                    <div
                        className="auth-container-mobile"
                        style={{
                            height:
                                pathName === "/auth/signup"
                                    ? "700px"
                                    : pathName === "/auth/login"
                                        ? "450px"
                                        : pathName === "/auth/forgotPassword"
                                            ? "350px"
                                            : "350px",
                        }}
                    >
                        <div className="upper-auth-container">
                            <img src={Logo} alt="Workbenchh" className="auth-logo-mobile" />
                        </div>
                        <div className="bottom-auth-container">
                            {loading === true ? <LoadingScreen /> : <Outlet />}
                        </div>
                    </div>
                }
            </div>
        </>
    );
};

export default AuthScreen;
