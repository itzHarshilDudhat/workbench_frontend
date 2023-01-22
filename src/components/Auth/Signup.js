import { Button, Form, Input } from 'antd';
import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { onSignup } from '../../config/slice/AuthSlice';
const Signup = () => {
    let navigate = useNavigate()
    const onFinishFailed = () => {
        toast("Please fill require fields");
    };
    const dispatch = useDispatch()
    const onLoginSubmit = (values) => {
        dispatch(onSignup(values, navigate))
    }
    return (
        <>
            <div className="auth-right-content">
                <h1 className="">Sign Up</h1>
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
                        className="form-login-item"
                        label="Name"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: "Please enter your name!",
                            },
                        ]}
                    >
                        <Input
                            placeholder="Enter your Name"
                            className="input-form-place"
                        />
                    </Form.Item>
                    <Form.Item
                        className="form-login-item"
                        label="MobileNumber"
                        name="mobileNumber"
                        rules={[
                            {
                                required: true,
                                message: "Please enter your Mobile number!",
                            },
                        ]}
                    >
                        <Input
                            placeholder="Enter your mobile number"
                            className="input-form-place"
                        />
                    </Form.Item>
                    <Form.Item
                        className="form-login-item"
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
                            placeholder="Enter user name for later use!"
                            className="input-form-place"
                        />
                    </Form.Item>
                    <Form.Item
                        className="form-login-item"
                        label="email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: "Please enter your Email!",
                            },
                            {
                                type: "email",
                                message: "Input is not valid E-mail!",
                            },
                        ]}
                    >
                        <Input
                            placeholder="Enter your email"
                            className="input-form-place"
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
                    <Form.Item
                        className="form-login-item"
                        label="ConfirmPassword"
                        name="confirmPassword"
                        rules={[
                            {
                                required: true,
                                message: "Please enter password again!",
                            },
                            ({ getFieldValue }) => ({
                                validator(rule, value) {
                                    if (!value || getFieldValue("password") === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(
                                        "Password and confirm password do not match!"
                                    );
                                },
                            }),
                        ]}
                    >
                        <Input.Password
                            placeholder="Enter password again"
                            className="input-form-place"
                        />
                    </Form.Item>
                    <div className='submit-btn-div-login'>
                        <h5
                            className="forgot-link"
                            onClick={() => {
                                navigate("/auth/login");
                            }}
                        >
                            Already account?{" "}
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

export default Signup