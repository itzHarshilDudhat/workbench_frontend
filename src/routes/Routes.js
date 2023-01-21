import React from 'react'
import { BrowserRouter, Routes as Routess, Route } from 'react-router-dom'
import ForgotChange from '../components/Auth/ChangeForgot'
import ChangePassword from '../components/Auth/ChangePassword'
import ForgotPassword from '../components/Auth/ForgotPassword'
import Login from '../components/Auth/Login'
import Signup from '../components/Auth/Signup'
import VerifyEmail from '../components/Auth/VerifyEmail'
import AuthScreen from '../screens/AuthScreen'

const Routes = () => {
    return (
        <BrowserRouter>
            <Routess>
                <Route path='auth' element={<AuthScreen />}>
                    <Route path="login" element={<Login />} />
                    <Route path="signup" element={<Signup />} />
                    <Route path="forgotPassword" element={<ForgotPassword />} />
                    <Route path="changePassword/:verificationString" element={<ForgotChange />} />
                    <Route path="changePassword" element={<ChangePassword />} />
                </Route>
                <Route path='auth/verifyEmail/:verificationString' element={<VerifyEmail />}></Route>
            </Routess>
        </BrowserRouter>
    )
}

export default Routes