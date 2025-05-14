'use client'
import useAuth from '@/hooks/use-auth'
import { useState } from 'react'

const Logout = () => {
    const { logout } = useAuth()

    const [pending, setPending] = useState(false)

    const handleLogout = () => {
        setPending(true)
        logout(() => {
            setPending(false)
        })
    }


    return (
        <span onClick={handleLogout}>{pending ? 'Loging out..' : 'Logout'}</span>
    )
}

export default Logout