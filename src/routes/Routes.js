import React from 'react'
import { BrowserRouter, Routes as Routess, Route } from 'react-router-dom'
import ForgotChange from '../components/Auth/ChangeForgot'
import ChangePassword from '../components/Auth/ChangePassword'
import ForgotPassword from '../components/Auth/ForgotPassword'
import Login from '../components/Auth/Login'
import ProtectedRoute from '../components/Auth/ProtectedRoute'
import Signup from '../components/Auth/Signup'
import VerifyEmail from '../components/Auth/VerifyEmail'
import Dashboard from '../components/Dashboard/Dashboard'
import AuthScreen from '../screens/AuthScreen'
import DashboardScreen from '../screens/DashboardScreen'

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
                <Route path='' element={<ProtectedRoute />}>
                    <Route path='' element={<DashboardScreen />}>
                        <Route path='' element={<Dashboard />} />
                    </Route>
                </Route>
            </Routess>
        </BrowserRouter>
    )
}

export default Routes