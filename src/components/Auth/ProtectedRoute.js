import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import CheckAdminAuth from './CheckAuth'

const ProtectedRoute = () => {
    let IsLogin = CheckAdminAuth()
    return (
        <>
            {IsLogin ? <Outlet /> : <Navigate to={"/auth/login"} />}
        </>
    )
}

export default ProtectedRoute