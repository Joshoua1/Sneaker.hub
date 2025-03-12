import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Import images and video correctly
import shoe1 from '../Assets/Images/shoe1.jpg';
import shoe2 from '../Assets/Images/shoe2.jpg';
import sneaker1 from '../Assets/Images/sneakers1.webp';
import sneaker2 from '../Assets/Images/sneakers2.webp';
import sneaker3 from '../Assets/Images/sneakers3.jpg';
import videoBg from '../Assets/Video/shoe project home page.mp4';

function Landing() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeProductIndex, setActiveProductIndex] = useState(0);

  // Products data
  const products = [
    { id: 1, name: "Nike Air Jordan 1", price: "₹ 11,495.00", image: shoe1 },
    { id: 2, name: "Nike Air Force 1", price: "₹ 7,495.00", image: shoe2 },
    { id: 3, name: "Sneaker Model 1", price: "$129.99", image: sneaker1 },
    { id: 4, name: "Sneaker Model 2", price: "$149.99", image: sneaker2 },
    { id: 5, name: "Sneaker Model 3", price: "$99.99", image: sneaker3 }
  ];

  // Check scroll position for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-rotate featured products
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveProductIndex((prevIndex) => 
        prevIndex === products.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);
    
    return () => clearInterval(interval);
  }, [products.length]);

  // Check for user authentication on load
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('userData');
    
    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
        // Optionally verify token with backend
        // verifyToken(token); - Commented out for now to allow simpler login flow
      } catch (error) {
        console.error('Error parsing user data', error);
        handleLogout();
      }
    }
  }, []);

  // Verify token with backend - This would be used in a real application with a backend
  const verifyToken = async (token) => {
    try {
      const response = await fetch('http://localhost:5000/api/user/profile', {
        headers: {
          'x-auth-token': token
        }
      });
      
      if (!response.ok) {
        throw new Error('Token validation failed');
      }
      
      // Token is valid, user data is already set
    } catch (error) {
      console.error('Token verification failed:', error);
      handleLogout();
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    setUser(null);
    navigate('/login');
  };

  return (
    <div className="font-sans bg-gray-50">
      {/* Fixed Hamburger Menu Button */}
      <button 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className={`fixed top-5 right-5 z-50 p-2 rounded-full ${isScrolled ? 'bg-black bg-opacity-80' : 'bg-black bg-opacity-50'} text-white focus:outline-none transition-all duration-300 hover:bg-red-500`}
        aria-label="Toggle menu"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          {isMenuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled ? 'bg-black bg-opacity-90 py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-bold text-white">
                Sneakers<span className="text-red-500">.Hub</span>
              </Link>
            </div>

            {/* Hidden on all screen sizes, replaced by always-visible hamburger */}
            <div className="hidden">
              <Link to="/Landing" className="text-white hover:text-red-400 transition duration-300">Home</Link>
              <Link to="/products" className="text-white hover:text-red-400 transition duration-300">Products</Link>
              <Link to="/about" className="text-white hover:text-red-400 transition duration-300">About</Link>
              <Link to="/contact" className="text-white hover:text-red-400 transition duration-300">Contact</Link>
            </div>

            {/* Always hidden user section, moved to slide-in menu */}
            <div className="hidden">
              {user ? (
                <div className="flex items-center space-x-4">
                  <span className="text-white">{user.email}</span>
                  <button 
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition duration-300"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link 
                    to="/login" 
                    className="text-white hover:text-red-400 transition duration-300"
                  >
                    Login
                  </Link>
                  <Link 
                    to="/signup" 
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition duration-300"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Slide-in menu overlay */}
        <div 
          className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          onClick={() => setIsMenuOpen(false)}
        ></div>

        {/* Slide-in menu */}
        <div 
          className={`fixed top-0 right-0 w-64 sm:w-80 h-full bg-black z-50 transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
          <div className="flex flex-col h-full px-6 py-16">
            <div className="space-y-6 mb-8">
              <Link to="/Landing" className="block text-xl text-white hover:text-red-400 transition duration-300">Home</Link>
              <Link to="/products" className="block text-xl text-white hover:text-red-400 transition duration-300">Products</Link>
              <Link to="/about" className="block text-xl text-white hover:text-red-400 transition duration-300">About</Link>
              <Link to="/contact" className="block text-xl text-white hover:text-red-400 transition duration-300">Contact</Link>
            </div>
            
            <div className="mt-auto">
              {user ? (
                <div className="space-y-4">
                  <p className="text-white mb-2">Signed in as: <br/><span className="font-medium">{user.email}</span></p>
                  <button 
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition duration-300 w-full"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <Link 
                    to="/login" 
                    className="block w-full text-center text-white border border-white hover:bg-white hover:text-black px-4 py-2 rounded-md transition duration-300"
                  >
                    Login
                  </Link>
                  <Link 
                    to="/signup" 
                    className="block w-full text-center bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition duration-300"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Rest of the page remains unchanged */}
      {/* Header with Video Background */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden">
        <video
          className="absolute w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={videoBg} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
            Step Into <span className="text-red-500">Style</span>
          </h1>
          <p className="text-xl md:text-2xl text-white mb-8 max-w-2xl">
            Discover the perfect blend of comfort and style with our premium sneaker collection
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              to="/products"
              className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-md font-semibold transition duration-300 transform hover:scale-105"
            >
              Shop Now
            </Link>
            <Link
              to="/about"
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-md font-semibold transition duration-300 hover:bg-white hover:text-black"
            >
              Learn More
            </Link>
          </div>
        </div>
      </header>

      {/* Featured Product Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-2">Featured Product</h2>
          <p className="text-gray-600 text-center mb-10">Experience our premium selection</p>
          
          <div className="relative overflow-hidden rounded-xl shadow-2xl max-w-4xl mx-auto" style={{ height: "500px" }}>
            {products.map((product, index) => (
              <div 
                key={product.id}
                className={`absolute inset-0 transition-all duration-700 transform ${index === activeProductIndex ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'}`}
              >
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex flex-col justify-end p-8">
                  <h3 className="text-3xl font-bold text-white mb-2">{product.name}</h3>
                  <p className="text-xl text-white mb-4">{product.price}</p>
                  <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-md font-semibold transition duration-300 transform hover:scale-105 w-fit">
                    View Details
                  </button>
                </div>
              </div>
            ))}
            
            {/* Navigation dots */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
              {products.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveProductIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${index === activeProductIndex ? 'bg-red-500 scale-125' : 'bg-white bg-opacity-50 hover:bg-opacity-75'}`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

{/* Products Section with animation */}
<section className="py-16 px-4 sm:px-8 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-3">Our Collection</h2>
          <p className="text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            Explore our carefully curated selection of premium sneakers, designed for both style and comfort.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <div 
                key={product.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover transform transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <button className="bg-white text-black px-4 py-2 rounded-md font-medium transform -translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                      Quick View
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  <p className="text-lg text-gray-700 mb-4">{product.price}</p>
                  <div className="flex space-x-2">
                    <button className="flex-1 bg-black text-white py-2 rounded-md hover:bg-gray-800 transition duration-300">
                      Add to Cart
                    </button>
                    <button className="flex-none w-10 h-10 bg-red-50 text-red-500 rounded-md flex items-center justify-center transition duration-300 hover:bg-red-500 hover:text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link
              to="/products"
              className="inline-block bg-black hover:bg-gray-800 text-white px-8 py-3 rounded-md font-semibold transition duration-300"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Our Newsletter</h2>
            <p className="text-gray-300 mb-8">
              Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 sm:gap-0">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-grow px-4 py-3 rounded-lg sm:rounded-r-none text-black focus:outline-none"
                required
              />
              <button 
                type="submit" 
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg sm:rounded-l-none font-medium transition duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Sneakers<span className="text-red-500">.Hub</span></h3>
              <p className="text-gray-400 mb-4">
                The ultimate destination for sneaker enthusiasts and collectors.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-400 hover:text-white transition duration-300">Home</Link></li>
                <li><Link to="/products" className="text-gray-400 hover:text-white transition duration-300">Products</Link></li>
                <li><Link to="/about" className="text-gray-400 hover:text-white transition duration-300">About Us</Link></li>
                <li><Link to="/contact" className="text-gray-400 hover:text-white transition duration-300">Contact</Link></li>
                <li><Link to="/faq" className="text-gray-400 hover:text-white transition duration-300">FAQ</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-start">
                  <svg className="w-5 h-5 mr-2 mt-0.5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>123 Sneaker Street, Fashion District, NY 10001</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 mr-2 mt-0.5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>info@sneakershub.com</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 mr-2 mt-0.5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498.998a1.001 1.001 0 00.95.316l3.043-.154a1 1 0 01.673.356L20 10.293V19a2 2 0 01-2 2H6a2 2 0 01-2-2v-8a2 2 0 012-2h3.211a1 1 0 00.876-.634l1.591-3.647a.5.5 0 01.524-.319h3.87a.5.5 0 01.38.173l3.148 3.327A.5.5 0 0120 8a.5.5 0 01-.5.5" />
                  </svg>
                  <span>+1 (555) 123-4567</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-10 pt-6">
            <p className="text-gray-400 text-center">
              &copy; {new Date().getFullYear()} Sneakers.Hub. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Landing;