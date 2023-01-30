import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { onVerifyEmail } from '../../config/slice/AuthSlice'
import LoadingScreen from '../../screens/LoadingScreen'

const VerifyEmail = () => {
    const { verificationString } = useParams()
    let dispatch = useDispatch()
    let navigate = useNavigate()
    useEffect(() => {
        dispatch(onVerifyEmail(verificationString, navigate))
    }, [verificationString])

    return (
        <>
            <div style={{ height: "100vh" }}>
                <LoadingScreen />
            </div>
        </>
    )
}

export default VerifyEmail