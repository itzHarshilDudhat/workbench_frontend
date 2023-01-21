import { Button, Form, Input } from 'antd';
import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { onLogin } from '../../config/slice/AuthSlice';
const Login = () => {
    let navigate = useNavigate()
    const onFinishFailed = () => {
        toast("Please fill require fields");
    };
    const dispatch = useDispatch()
    const onLoginSubmit = (values) => {
        dispatch(onLogin(values, navigate))
    }
    return (
        <>
            <div className="auth-right-content">
                <h1 className="">Log In</h1>
                <Form
                    layout="vertical"
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onLoginSubmit}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    className="login-label"
                >
                    <Form.Item
                        className="form-login-item item-email"
                        label="User name"
                        name="userName"
                        rules={[
                            {
                                required: true,
                                message: "Please enter your Username!",
                            },
                        ]}
                    >
                        <Input
                            placeholder="Enter User Name"
                            className="input-form-place email m-top"
                        />
                    </Form.Item>
                    <Form.Item
                        className="form-login-item "
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Please enter your password!",
                            },
                        ]}
                    >
                        <Input.Password
                            placeholder="Enter password"
                            className="input-form-place coffee-password m-top"
                        />
                    </Form.Item>
                    <div className='submit-btn-div-login'>
                        <h5
                            className="forgot-link"
                            onClick={() => {
                                navigate("/auth/forgotPassword");
                            }}
                        >
                            Forgot Password{" "}
                        </h5>

                        <Form.Item className="submit-btn-login">
                            <Button
                                className="btn-submit"
                                type="primary"
                                htmlType="submit"
                            >
                                Submit
                            </Button>
                        </Form.Item>
                    </div>
                </Form>
            </div>
        </>
    )
}

export default Login