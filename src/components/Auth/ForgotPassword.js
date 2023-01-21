import { Button, Form, Input } from 'antd';
import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { onForgotPassword } from '../../config/slice/AuthSlice';
const ForgotPassword = () => {
    let navigate = useNavigate()
    const onFinishFailed = () => {
        toast("Please fill require fields");
    };
    const dispatch = useDispatch()
    const onSubmit = (values) => {
        dispatch(onForgotPassword(values, navigate))
    }
    return (
        <>
            <div className="auth-right-content">
                <h1 className="">Forgot password</h1>
                <Form
                    layout="vertical"
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onSubmit}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    className="login-label"
                >
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
                    <div className='submit-btn-div-login'>
                        <h5
                            className="forgot-link"
                            onClick={() => {
                                navigate("/auth/login");
                            }}
                        >
                            Back to login{" "}
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

export default ForgotPassword