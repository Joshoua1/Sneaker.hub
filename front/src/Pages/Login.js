import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Styles/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle authentication logic
    console.log('Login attempt with:', { email, password });
    
    // Store user data in localStorage (in a real app, this would come from your backend)
    const userData = { email: email }; // Add any other user data you want to display
    localStorage.setItem('userData', JSON.stringify(userData));
    localStorage.setItem('token', 'your-auth-token'); // In a real app, this would be a JWT from your backend
    
    // Show success message
    setShowSuccess(true);
    
    // Redirect after a short delay
    setTimeout(() => {
      navigate('/Landing');
    }, 3000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 relative">
      {/* Animated Success Message Overlay */}
      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-60 backdrop-blur-sm transition-all duration-500 ease-in-out">
          <div className="bg-white rounded-2xl shadow-2xl p-8 transform transition-all duration-700 ease-out scale-100 max-w-md w-full mx-4 border border-blue-100">
            <div className="text-center">
              {/* Animated success checkmark */}
              <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-gradient-to-r from-green-400 to-blue-500 shadow-lg mb-4 animate-pulse">
                <svg className="h-12 w-12 text-white animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              
              {/* Success text with animation */}
              <h3 className="mt-2 text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Login Successful!
              </h3>
              
              <p className="mt-4 text-gray-700 font-medium text-lg">
                Welcome back to Sneaker.hub
              </p>
              
              {/* Animated loading indicator */}
              <div className="mt-6 flex justify-center">
                <div className="flex space-x-2">
                  <div className="h-2 w-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                  <div className="h-2 w-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                  <div className="h-2 w-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: "0.3s" }}></div>
                </div>
              </div>
              
              <p className="mt-4 text-sm text-gray-500">
                Redirecting you to your dashboard...
              </p>
              
              {/* Confetti-like elements */}
              <div className="absolute top-0 left-1/4 w-4 h-4 bg-yellow-300 rounded-full opacity-75 animate-ping" style={{ animationDuration: "1.5s" }}></div>
              <div className="absolute bottom-1/4 right-1/4 w-3 h-3 bg-purple-400 rounded-full opacity-75 animate-ping" style={{ animationDuration: "2s" }}></div>
              <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-green-400 rounded-full opacity-75 animate-ping" style={{ animationDuration: "2.5s" }}></div>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Login Form */}
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md border border-gray-200">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Login to Sneaker.hub</h2>
          <p className="text-gray-500 mt-2">Enter your credentials to access your account</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow-sm border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="mb-8">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow-sm border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <div className="mb-6">
            <button
              className="w-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-102"
              type="submit"
            >
              Sign In
            </button>
          </div>
          
          <div className="text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link to="/signup" className="text-blue-600 hover:text-blue-800 font-medium transition duration-200">
                Sign up here
              </Link>
            </p>
          </div>
        </form>
        
        <div className="mt-8 text-center">
          <Link to="/" className="text-gray-600 hover:text-gray-800 transition duration-200">
            ← Back to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;