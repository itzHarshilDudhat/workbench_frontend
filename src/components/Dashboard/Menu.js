import React from "react";
import {
    LoginOutlined,
    UserOutlined,
    UserSwitchOutlined,
} from "@ant-design/icons";
import { Drawer, Layout, Menu as Menuu } from "antd";
import { useNavigate } from "react-router-dom";
import LogoDiv from "./LogoDiv";
import { useDispatch, useSelector } from "react-redux";
import { setIsCollapsed } from "../../config/slice/DashboardSlice";
import logo from "../../assets/images/Logo.png"


const { Sider } = Layout;

const Menu = () => {
    const navigate = useNavigate();
    let dispatch = useDispatch()
    const handleCloseDrawer = () => {
        dispatch(setIsCollapsed(false))
    }
    let collapsed = useSelector((state) => state.dashboard.collapsed)
    let isMobile = useSelector((state) => state.dashboard.isMobile)
    let menuItems = [
        {
            onClick: () => {
                navigate("/");
            },
            key: "1",
            icon: <UserOutlined />,
            label: "Dashboard",
        },
        {
            key: "2",
            icon: <UserSwitchOutlined />,
            label: "User management",
            onClick: () => {
                navigate("/user-management");
            },
        },
        {
            key: "7",
            icon: <LoginOutlined />,
            label: "Logout",
            onClick: () => {
                localStorage.removeItem("Token");
                navigate("/auth/login");
            },
        },
    ]
    return (
        <>
            {isMobile === false ?
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={collapsed}
                    className="sidebar-dashboard"
                    style={{
                        backgroundColor: "#1e3c72",
                        height: "100vh",
                        position: "fixed",
                    }}
                >
                    <LogoDiv />
                    <Menuu
                        theme="dark"
                        mode="inline"
                        style={{ backgroundColor: "#1e3c72" }}
                        defaultSelectedKeys={["1"]}
                        items={menuItems}
                    />
                </Sider>

                : <Drawer
                    onClose={() => {
                        dispatch(setIsCollapsed(!collapsed))
                    }}
                    placement="left"
                    open={collapsed}
                    closable={true}
                    className='drawer'
                    width={200}
                    extra={
                        <div className="logo">
                            <img src={logo} alt="logo" height={50} width={40} />
                        </div>
                    }>
                    <Menuu
                        theme="dark"
                        mode="inline"
                        onClick={handleCloseDrawer}
                        style={{ backgroundColor: "#1e3c72" }}
                        defaultSelectedKeys={["1"]}
                        items={menuItems}
                    />
                </Drawer>
            }
        </>
    );
};

export default Menu;
