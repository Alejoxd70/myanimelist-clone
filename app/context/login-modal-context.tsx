'use client'
import { createContext, useState } from 'react'

export interface LoginModalContextType {
  loginOpen: boolean
  registerOpen: boolean
  setLoginOpen: (open: boolean) => void
  setRegisterOpen: (open: boolean) => void
  switchToRegister: () => void
  switchToLogin: () => void
}

export const LoginModalContext = createContext<LoginModalContextType | undefined>(undefined)

export const LoginModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [loginOpen, setLoginOpen] = useState(false)
  const [registerOpen, setRegisterOpen] = useState(false)

  const switchToRegister = () => {
    setLoginOpen(false)
    setRegisterOpen(true)
  }

  const switchToLogin = () => {
    setRegisterOpen(false)
    setLoginOpen(true)
  }

  return (
    <LoginModalContext.Provider
      value={{
        loginOpen,
        setLoginOpen,
        registerOpen,
        setRegisterOpen,
        switchToRegister,
        switchToLogin,
      }}
    >
      {children}
    </LoginModalContext.Provider>
  )
}
