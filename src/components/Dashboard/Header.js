import { DownOutlined, LoginOutlined, MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from '@ant-design/icons';
import { Dropdown, Space, theme } from 'antd';
import { Header as Headerr } from 'antd/es/layout/layout';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { setIsCollapsed } from '../../config/slice/DashboardSlice';

const Header = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    let collapsed = useSelector((state) => state.dashboard.collapsed)
    let dispatch = useDispatch()
    let navigate = useNavigate()
    const items = [
        {
            key: "0",
            icon: <UserOutlined />,
            label: " Profile",
            onClick: () => {
                // navigate("/Profile")
            }
        },

        {
            key: "1",
            icon: <LoginOutlined />,
            label: "Logout",
            onClick: () => {
                localStorage.removeItem("Token");
                navigate("/auth/login");
            },
        },
    ];

    return (
        <>
            <Headerr
                className="header"
                style={{
                    padding: 0,
                    background: colorBgContainer,
                }}
            >
                {React.createElement(
                    collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                    {
                        className: "trigger",
                        onClick: () => dispatch(setIsCollapsed(!collapsed)),
                    }
                )}

                <Dropdown
                    menu={{
                        items,
                    }}
                    trigger={["click"]}
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                >
                    <a onClick={(e) => e.preventDefault()} >
                        <Space>
                            <DownOutlined />
                        </Space>
                    </a>
                </Dropdown>
            </Headerr>
        </>
    )
}

export default Header