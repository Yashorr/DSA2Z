import React from 'react'
import { useAuthStore } from '../store/useAuthStore'

const LogoutButton = ({children}) => {
    const {logout} = useAuthStore()
    const onLogout = async () => {
        await logout();
    }

  return (
    <button className='btn btn-primary w-full hover:bg-[#4FD1C5] bg-[#4FD1C5]/20 hover:text-white border-none' onClick={onLogout}>
        {children}
    </button>
  )
}

export default LogoutButton