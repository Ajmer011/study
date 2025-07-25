import React from "react";

const Register = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-blue-100 via-white to-blue-100 text-black">
      {/* Left Image */}
      <div className="md:w-1/2 flex items-center justify-center p-8">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpuuqXCtgE1TbqCUvDCvkDi4jGfqJXIJt_2Q&s"
          alt="Registration"
          className="w-full sm:max-w-[600px] md:max-w-[800px] lg:max-w-[350px] max-h-[70vh] rounded-3xl shadow-2xl object-cover border-4 border-blue-300 hover:shadow-blue-400 hover:scale-105 transition-all duration-500 ease-in-out"
        />
      </div>

      {/* Right Form */}
      <div className="md:w-1/2 flex items-center justify-center p-6">
        <div className="bg-white/90 backdrop-blur-sm text-gray-900 rounded-3xl shadow-2xl p-10 w-full max-w-md space-y-6 border-t-4 border-blue-400">
          <h2 className="text-3xl font-bold text-center text-blue-700">Create Account</h2>
          <p className="text-sm text-gray-600 text-center">
            Sign up to get started with our awesome app
          </p>

          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-blue-600 mb-1">Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-600 mb-1">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-600 mb-1">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold shadow-md hover:shadow-lg transition duration-300"
            >
              Register
            </button>
          </form>

          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <a href="#LoginPage" className="text-blue-600 hover:underline font-medium">
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
