import React from "react";
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full overflow-hidden"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row">
          {/* Login Form */}
          <motion.div
            className="w-full md:w-1/2 p-8 sm:p-10"
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Welcome Back</h2>
            <p className="text-sm text-gray-500 mb-6">
              Don’t have an account?{" "}
              <Link to="/signup" className="text-blue-600 hover:underline font-medium">
                Sign Up
              </Link>
            </p>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="accent-blue-600 h-4 w-4" />
                  <span className="text-gray-600">Remember me</span>
                </label>
                <a href="#" className="text-blue-600 hover:underline">
                  Forgot Password?
                </a>
              </div>

              <button
                className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
              >
                Sign In
              </button>
            </div>

            <div className="flex items-center justify-center my-6">
              <div className="border-t border-gray-200 w-full mr-4"></div>
              <span className="text-sm text-gray-400">or continue with</span>
              <div className="border-t border-gray-200 w-full ml-4"></div>
            </div>

            <div className="flex space-x-4">
              <button className="flex-1 border border-gray-200 py-2.5 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
                </svg>
                Google
              </button>
              <button className="flex-1 border border-gray-200 py-2.5 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.675 0H1.325C.593 0 0 .593 0 1.326v21.348C0 23.407.593 24 1.325 24H12.82v-9.294H9.692V11.11h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.595h-3.12V24h6.116c.732 0 1.325-.593 1.325-1.326V1.326C24 .593 23.407 0 22.675 0z"/>
                </svg>
                Facebook
              </button>
            </div>
          </motion.div>

          {/* Illustration */}
          <motion.div
            className="hidden md:flex w-1/2 items-center justify-center bg-blue-50 p-8"
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="text-center">
             <svg
  className="w-64 h-64 mx-auto text-blue-500"
  fill="none"
  stroke="currentColor"
  strokeWidth="1.5"
  viewBox="0 0 24 24"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M12 6V18M6 7h4a2 2 0 012 2v9a2 2 0 01-2-2H6a2 2 0 01-2-2V9a2 2 0 012-2zm12 0h-4a2 2 0 00-2 2v9a2 2 0 002-2h4a2 2 0 002-2V9a2 2 0 00-2-2z"
  />
</svg>

              <p className="mt-4 text-gray-600 font-medium">Stay curious always</p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;