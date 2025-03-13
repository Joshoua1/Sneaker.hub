import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import '../Styles/Signup.css';

const Signup = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();
  
  // New state variables for enhanced functionality
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [formTouched, setFormTouched] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [emailValid, setEmailValid] = useState(true);
  const [nameValid, setNameValid] = useState(true);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [passwordFocused, setPasswordFocused] = useState(false);

  // Password strength checker
  useEffect(() => {
    if (password) {
      let strength = 0;
      // Length check
      if (password.length >= 8) strength += 1;
      // Contains uppercase
      if (/[A-Z]/.test(password)) strength += 1;
      // Contains lowercase
      if (/[a-z]/.test(password)) strength += 1;
      // Contains numbers
      if (/[0-9]/.test(password)) strength += 1;
      // Contains special characters
      if (/[^A-Za-z0-9]/.test(password)) strength += 1;
      
      setPasswordStrength(strength);
    } else {
      setPasswordStrength(0);
    }
  }, [password]);

  // Check password match
  useEffect(() => {
    if (confirmPassword) {
      setPasswordMatch(password === confirmPassword);
    } else {
      setPasswordMatch(true);
    }
  }, [password, confirmPassword]);

  // Validate email format
  useEffect(() => {
    if (email) {
      const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
      setEmailValid(emailRegex.test(email));
    } else {
      setEmailValid(true);
    }
  }, [email]);

  // Validate name
  useEffect(() => {
    if (fullName) {
      setNameValid(fullName.trim().length >= 2);
    } else {
      setNameValid(true);
    }
  }, [fullName]);

  const handleInputChange = (e, setter) => {
    setter(e.target.value);
    if (!formTouched) setFormTouched(true);
  };

  const getPasswordStrengthLabel = () => {
    if (password.length === 0) return '';
    const labels = ['Very Weak', 'Weak', 'Medium', 'Strong', 'Very Strong'];
    return labels[Math.min(passwordStrength, 4)];
  };

  const getPasswordStrengthColor = () => {
    const colors = ['#ef4444', '#f59e0b', '#f59e0b', '#10b981', '#10b981'];
    return colors[Math.min(passwordStrength, 4)];
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset error state
    setError('');
    
    // Enhanced validation
    if (fullName.trim().length < 2) {
      setError("Please enter your full name (minimum 2 characters)");
      return;
    }

    if (!emailValid) {
      setError("Please enter a valid email address");
      return;
    }
    
    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }
    
    if (password !== confirmPassword) {
      setError("Passwords don't match!");
      return;
    }
    
    try {
      setLoading(true);
      
      // Send signup request to backend
      const response = await axios.post('http://localhost:5000/api/signup', {
        fullName: fullName.trim(),
        email: email.trim(),
        password
      });
      
      // Handle success
      console.log('Registration successful:', response.data);
      
      // Show success message instead of alert
      setShowSuccess(true);
      
      // Redirect after a delay
      setTimeout(() => {
        navigate('/login');
      }, 3000);
      
    } catch (err) {
      // Handle errors
      console.error('Registration error:', err);
      
      if (err.response && err.response.data && err.response.data.errors) {
        // Display the first validation error
        setError(err.response.data.errors[0].msg);
      } else if (err.response && err.response.data && err.response.data.message) {
        // Display custom error message from server
        setError(err.response.data.message);
      } else {
        setError('Failed to create account. Please try again.');
      }
    } finally {
      setLoading(false);
    }
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
                Account Created!
              </h3>
              
              <p className="mt-4 text-gray-700 font-medium text-lg">
                Welcome to Sneaker.hub, {fullName}!
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
                Redirecting you to login...
              </p>
              
              {/* Confetti-like elements */}
              <div className="absolute top-0 left-1/4 w-4 h-4 bg-yellow-300 rounded-full opacity-75 animate-ping" style={{ animationDuration: "1.5s" }}></div>
              <div className="absolute bottom-1/4 right-1/4 w-3 h-3 bg-purple-400 rounded-full opacity-75 animate-ping" style={{ animationDuration: "2s" }}></div>
              <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-green-400 rounded-full opacity-75 animate-ping" style={{ animationDuration: "2.5s" }}></div>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Signup Form */}
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md border border-gray-200">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Create an Account</h2>
          <p className="text-gray-500 mt-2">Join Sneaker.hub today</p>
        </div>
        
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
              </svg>
              <p>{error}</p>
            </div>
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fullName">
              Full Name
            </label>
            <input
              className={`shadow-sm border ${!nameValid && formTouched ? 'border-red-500' : 'border-gray-300'} rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200`}
              id="fullName"
              type="text"
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) => handleInputChange(e, setFullName)}
              required
            />
            {!nameValid && formTouched && (
              <p className="text-red-500 text-xs italic mt-1">Name should be at least 2 characters</p>
            )}
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className={`shadow-sm border ${!emailValid && formTouched ? 'border-red-500' : 'border-gray-300'} rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200`}
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => handleInputChange(e, setEmail)}
              required
            />
            {!emailValid && formTouched && (
              <p className="text-red-500 text-xs italic mt-1">Please enter a valid email</p>
            )}
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                className="shadow-sm border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                value={password}
                onChange={(e) => handleInputChange(e, setPassword)}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
                required
              />
              <button 
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 focus:outline-none"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
            
            {/* Password strength meter */}
            {(password || passwordFocused) && (
              <div className="mt-2">
                <div className="flex items-center justify-between mb-1">
                  <div className="text-xs font-medium" style={{ color: getPasswordStrengthColor() }}>
                    {getPasswordStrengthLabel()}
                  </div>
                </div>
                <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full transition-all duration-300 ease-in-out" 
                    style={{ 
                      width: `${(passwordStrength / 5) * 100}%`,
                      backgroundColor: getPasswordStrengthColor()
                    }}
                  ></div>
                </div>
                <ul className="text-xs text-gray-500 mt-2 space-y-1">
                  <li className={password.length >= 8 ? "text-green-500" : ""}>
                    • At least 8 characters
                  </li>
                  <li className={/[A-Z]/.test(password) ? "text-green-500" : ""}>
                    • At least one uppercase letter
                  </li>
                  <li className={/[a-z]/.test(password) ? "text-green-500" : ""}>
                    • At least one lowercase letter
                  </li>
                  <li className={/[0-9]/.test(password) ? "text-green-500" : ""}>
                    • At least one number
                  </li>
                  <li className={/[^A-Za-z0-9]/.test(password) ? "text-green-500" : ""}>
                    • At least one special character
                  </li>
                </ul>
              </div>
            )}
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <div className="relative">
              <input
                className={`shadow-sm border ${!passwordMatch && formTouched && confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200`}
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => handleInputChange(e, setConfirmPassword)}
                required
              />
              <button 
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 focus:outline-none"
                onClick={toggleConfirmPasswordVisibility}
              >
                {showConfirmPassword ? (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
            {!passwordMatch && formTouched && confirmPassword && (
              <p className="text-red-500 text-xs italic mt-1">Passwords don't match</p>
            )}
          </div>
          
          <div className="mb-6">
            <button
              className={`w-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-102 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="spinner-border animate-spin inline-block w-4 h-4 border-2 rounded-full mr-2" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                  <span>Creating Account...</span>
                </div>
              ) : (
                'Create Account'
              )}
            </button>
          </div>
          
          <div className="text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-600 hover:text-blue-800 font-medium transition duration-200">
                Sign in here
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

export default Signup;