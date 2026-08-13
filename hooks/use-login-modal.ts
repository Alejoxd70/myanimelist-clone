import { useContext } from 'react'
import { LoginModalContext, type LoginModalContextType } from '@/app/context/login-modal-context'

export const useLoginModal = (): LoginModalContextType => {
  const context = useContext(LoginModalContext)
  if (!context) {
    throw new Error('useLoginModal must be used within a LoginModalProvider')
  }
  return context
}
