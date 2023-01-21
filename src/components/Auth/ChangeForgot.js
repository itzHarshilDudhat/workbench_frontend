import { Button, Form, Input } from 'antd';
import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { onForgotChange } from '../../config/slice/AuthSlice';
const ForgotChange = () => {
    const { verificationString } = useParams()
    let navigate = useNavigate()
    const onFinishFailed = () => {
        toast("Please fill require fields");
    };
    const dispatch = useDispatch()
    const onSubmit = (values) => {
        values.verificationString = verificationString
        dispatch(onForgotChange(values, navigate))
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

export default ForgotChange