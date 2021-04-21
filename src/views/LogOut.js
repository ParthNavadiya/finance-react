import React, { useEffect } from 'react'
import { useHistory } from 'react-router'

const LogOut = () => {
    const history = useHistory()
    useEffect(() => {
        localStorage.clear()
        sessionStorage.clear()
        history.push('/login')
    }, [])

    return (
        <>
        </>
    )
}

export default LogOut
