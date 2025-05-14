'use client'
import AuthPopup from '@/components/auth/auth-popup'
import { authClient } from '@/lib/auth-client'
import React, { ReactNode, SetStateAction, useEffect, useState, Dispatch, createContext } from 'react'
import toast from 'react-hot-toast'

export const AuthContext = createContext({
  isOpen: false,
  togglePopup: () => { },
  setIsOpen: (() => { }) as Dispatch<SetStateAction<boolean>>,
  openDialog: () => { },
  isAuthenticated: false,
  logout: (callback: () => void) => { callback() },
  signin: () => { },
});

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const { data } = authClient.useSession()
  const userId = data?.user?.id

  useEffect(() => {
    if (userId) {
      setIsAuthenticated(true)
    } else {
      setIsAuthenticated(false)
    }
  }, [data, userId])


  const togglePopup = () => {
    setIsOpen(!isOpen)
  }

  const openDialog = () => {
    setIsOpen(true)


  }

  const signin = () => {
    setIsAuthenticated(true)
    setIsOpen(false)
  }

  const logout = async (callback: () => void) => {
    setIsOpen(false)
    try {
      await authClient.signOut()
      setIsAuthenticated(false)
      callback()
    } catch (error) {
      console.error('Logout error:', error)
      setIsAuthenticated(true)
      toast.error('Logout failed. Please try again.')
      callback()
    }
  }
  return (
    <AuthContext.Provider value={{
      isOpen,
      togglePopup,
      setIsOpen,
      openDialog,
      isAuthenticated,
      logout,
      signin
    }}>
      <AuthPopup />
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider