import React , { useState } from 'react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import {
  Code,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
} from "lucide-react";

import {z} from 'zod' ;
import AuthImagePattern from '../components/AuthImagePattern';
import { useAuthStore } from '../store/useAuthStore';

const signUpSchema = z.object({
    email: z.string().email('Invalid email').min(1, 'Email is required'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    name : z.string().min(1, 'Name is required'),
})


const SignUpPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, formState: {errors}} = useForm({resolver: zodResolver(signUpSchema)})

    const {signup , isSigningUp}=useAuthStore();

    const onSubmit = async (data) =>{
        try {
          await signup(data);
          console.log(data)
        } catch (error) {
          console.log(error)
                    
        }
    }
  return (
    <div className='h-screen grid lg:grid-cols-2'>
       <div className="flex items-center justify-center px-8 py-12 ">
        <div className="w-full max-w-md space-y-8">
          {/* Logo and title */}
          <div className="text-center">
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-[#4FD1C5] to-[#4FD1C5]/80 flex items-center justify-center shadow-lg">
                  <Code className="w-7 h-7 text-white" />
                </div>
                
              </div>
            </div>
            <h2 className="mt-6 text-3xl font-bold text-white">Create an account</h2>
            <p className="mt-2 text-sm text-gray-400">
              Join us to get started with our platform
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
            <div className="space-y-5">
              {/* Name field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                  Full Name
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Code className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    id="name"
                    type="text"
                    autoComplete="name"
                    {...register("name")}
                    className={`block w-full pl-10 pr-3 py-2 border ${
                      errors.name ? "border-red-500" : "border-gray-700"
                    } bg-gray-800 rounded-md shadow-sm placeholder-gray-500 text-white focus:outline-none focus:ring-[#4FD1C5] focus:border-[#4FD1C5]`}
                    placeholder="John Doe"
                  />
                </div>
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>

              {/* Email field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                  Email address
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    {...register("email")}
                    className={`block w-full pl-10 pr-3 py-2 border ${
                      errors.email ? "border-red-500" : "border-gray-700"
                    } bg-gray-800 rounded-md shadow-sm placeholder-gray-500 text-white focus:outline-none focus:ring-[#4FD1C5] focus:border-[#4FD1C5]`}
                    placeholder="you@example.com"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              {/* Password field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                  Password
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    {...register("password")}
                    className={`block w-full pl-10 pr-10 py-2 border ${
                      errors.password ? "border-red-500" : "border-gray-700"
                    } bg-gray-800 rounded-md shadow-sm placeholder-gray-500 text-white focus:outline-none focus:ring-[#4FD1C5] focus:border-[#4FD1C5]`}
                    placeholder="••••••••"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                     className="text-gray-400 hover:text-gray-300 focus:outline-none"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
                )}
              </div>
            </div>

            {/* Submit button */}
            <div>
              <button
                type="submit"
                disabled={isSigningUp}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-900 bg-gradient-to-r from-[#4FD1C5] to-[#4FD1C5]/80 hover:from-[#4FD1C5]/90 hover:to-[#4FD1C5] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4FD1C5] focus:ring-offset-gray-900"
              >
                {isSigningUp ? (
                  <>
                    <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                    Creating Account...
                  </>
                ) : (
                  "Sign up"
                )}
                
              </button>
            </div>
          </form>

          {/* Sign in link */}
          <div className="text-center mt-4">
            <p className="text-sm text-gray-400">
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-[#4FD1C5] hover:text-[#4FD1C5]/80">
                Sign in
              </Link>
            </p>
          </div>
          
          {/* Terms */}
          <div className="text-center mt-6">
            <p className="text-xs text-gray-500">
              By signing up, you agree to our{" "}
              <a href="#" className="text-[#4FD1C5] hover:text-[#4FD1C5]/80">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-[#4FD1C5] hover:text-[#4FD1C5]/80">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
      <AuthImagePattern 
          title={"Welcome to our platform!"}
          subtitle= {"Sign up to access our platform and start your journey!"}
      />
    </div>
  )
}

export default SignUpPage