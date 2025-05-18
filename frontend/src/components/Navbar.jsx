import React from 'react'
import { Link } from 'react-router-dom'
import {User , Code , LogOut} from 'lucide-react'
import { useAuthStore } from '../store/useAuthStore'
import LogoutButton from './LogoutButton'

const Navbar = () => {
    const {authUser} = useAuthStore()
  return (
      <nav className="mx-auto w-[95%] max-w-5xl z-50 bg-gradient-to-r from-[#1e293b]/90 to-[#0f172a]/90 backdrop-blur-xl border border-[#4FD1C5]/20 rounded-2xl shadow-lg shadow-[#4FD1C5]/10 px-6 py-3 mt-5">
      <div className="flex w-full justify-between items-center">
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-3 transition-transform scale-200 pl-5 hover:scale-205 duration-200">
          <img src="/logo.png" alt="DSA2Z Logo" className="w-25 h-10" />
        </Link>

        {/* User Profile and Dropdown */}
        <div className="flex items-center">
          <div className="relative group">
            {/* Avatar Button */}
            <button className="w-10 h-10 rounded-full border-2 border-[#F97316] shadow-md shadow-[#F97316]/20 hover:shadow-[#F97316]/40 transition-shadow duration-300 ease-in-out overflow-hidden">
              <img
                src={authUser?.image || "https://avatar.iran.liara.run/public/boy"}
                alt="User Avatar"
                className="w-full h-full object-cover"
              />
            </button>
            
            {/* Dropdown Menu */}
            <div className="invisible opacity-0 translate-y-1 absolute right-0 mt-4 z-50 bg-gradient-to-b from-[#1e293b]/95 to-[#0f172a]/95 rounded-xl shadow-xl shadow-[#4FD1C5]/20 border border-[#4FD1C5]/10 backdrop-blur-lg p-3 w-60 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
              <div className="py-2">
                {/* User Name */}
                <div className="px-4 py-2 mb-1 z-50">
                  <p className="text-base font-semibold text-white/90 truncate">
                    {authUser?.name}
                  </p>
                  <div className="mt-1 h-px bg-[#4FD1C5]/20"></div>
                </div>
                
                {/* Menu Items */}
                <Link to="/profile" className="flex items-center gap-2 px-3 py-2 z-50 rounded-lg text-white/90 hover:bg-[#4FD1C5] hover:text-white transition-all duration-200 ease-in-out">
                  <User className="w-4 h-4" />
                  <span>My Profile</span>
                </Link>
                
                {authUser?.role === "ADMIN" && (
                  <Link to="/add-problem" className="flex items-center gap-2 px-3 py-2 z-50 rounded-lg text-white/90 hover:bg-[#4FD1C5] hover:text-white transition-all duration-200 ease-in-out">
                    <Code className="w-4 h-4" />
                    <span>Add Problem</span>
                  </Link>
                )}
                
                <LogoutButton className="flex items-center  gap-2 px-3 py-2 z-50 rounded-lg text-white/90 hover:bg-[#4FD1C5] hover:text-white transition-all duration-200 ease-in-out w-full text-left">
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </LogoutButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar