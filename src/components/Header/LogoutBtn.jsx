import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'

function LogoutBtn() {
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout())
    })
    
  }

  useEffect(() => {
    // Redirect to login page after logout
    navigate("/login");
  }, [logoutHandler]);

  return (
    <button
      onClick={logoutHandler}
      className="px-4 py-2 text-sm font-medium text-white rounded-full 
                               bg-blue-600 hover:bg-blue-500 hover:scale-105 
                               transition duration-300 ease-in-out"
    >
      Logout
    </button>
  )
}

export default LogoutBtn
