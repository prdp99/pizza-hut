'use client'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { authClient } from '@/lib/auth-client'
import useAuth from '@/hooks/use-auth'
import { DropdownMenuItem } from '../ui/dropdown-menu'
import { LogOut } from 'lucide-react'

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