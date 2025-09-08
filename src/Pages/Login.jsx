import React from 'react'
import { Login as LoginComponent } from '../components/index'

function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black px-4">
      <div className="w-full max-w-md  p-8 rounded-2xl shadow-lg border border-gray-700">
        <LoginComponent />
      </div>
    </div>
  )
}

export default Login
