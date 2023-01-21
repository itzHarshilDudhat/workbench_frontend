import React from 'react'
import { useParams } from 'react-router-dom'

const VerifyEmail = () => {
    const { verificationString } = useParams()
    console.log(verificationString)
    return (
        <>

        </>
    )
}

export default VerifyEmail