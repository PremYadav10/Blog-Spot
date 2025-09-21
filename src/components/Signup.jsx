import React, { useState } from 'react'
import authService from '../appwrite/auth'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../store/authSlice'
import { Button, Input, Logo } from './index.js'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'

function Signup() {
  const navigate = useNavigate()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm()

  const create = async (data) => {
    setError("")
    setLoading(true)
    try {
      const account = await authService.createAccount(data)
      if (account) {
        const currentUser = await authService.getCurrentUser()
        if (currentUser)
           dispatch(login(currentUser));
        navigate("/")
      }
    } catch (error) {
      setError(error?.message || "Something went wrong ")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center">
      <div className="mx-auto w-full max-w-lg bg-gray-900 text-gray-200 rounded-2xl p-8 border border-gray-700 shadow-xl">
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign up to create account
        </h2>
        <p className="mt-2 text-center text-base text-gray-400">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-blue-400 hover:text-blue-300 transition-colors duration-200"
          >
            Sign In
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

        <form onSubmit={handleSubmit(create)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Full Name:"
              placeholder="Enter your full name"
              {...register("name", { required: "Full name is required" })}
            />
            <Input
              label="Email:"
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: "Email is required",
                validate: {
                  matchPattern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be valid",
                },
              })}
            />
            <Input
              label="Password:"
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            <Button
              type="submit"
              className="w-full flex justify-center items-center"
              disabled={loading}
            >
              {loading && (
                <span className="animate-spin h-5 w-5 mr-2 border-t-2 border-b-2 border-white rounded-full"></span>
              )}
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup
