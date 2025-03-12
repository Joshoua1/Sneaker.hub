// SneakerHub.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Home.css';

const SneakerHub = () => {
  return (
    <div className="font-sans">
      <div className="hero min-h-screen flex items-center justify-center text-white bg-gradient-to-r from-purple-400 to-blue-500">
        <div className="container mx-auto text-center animate__animated animate__fadeIn">
          <h1 className="typing-text text-4xl md:text-6xl font-semibold mb-4 animate__animated animate__bounceInDown">
            <span>Welcome to Sneaker.hub</span>
          </h1>
          <p className="text-lg md:text-xl mb-6 animate__animated animate__fadeInUp animate__delay-1s">
            Discover the beauty of sneakers like never before.
          </p>
          <Link 
            to="/explore" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full text-lg md:text-xl font-semibold transition duration-300 ease-in-out animate__animated animate__fadeInUp animate__delay-2s"
          >
            Explore Now
          </Link>
          <div className="mt-4 animate__animated animate__fadeInUp animate__delay-3s">
            <Link to="/login" className="text-gray-400 hover:text-gray-600">Login</Link>
            <span className="text-gray-400 mx-2">|</span>
            <Link to="/signup" className="text-gray-400 hover:text-gray-600">Sign Up</Link>
          </div>
        </div>
      </div>

      <section className="container mx-auto mt-12 text-center animate__animated animate__fadeIn">
        <h2 className="text-2xl md:text-4xl font-semibold mb-4 animate__animated animate__bounceIn">
          Featured Sneakers
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="sneaker-card animate__animated animate__zoomIn">
            <img src={require('../Assets/Images/sneakers1.webp')} alt="Sneaker 1" className="sneaker-image rounded-lg shadow-lg transition-transform transform hover:scale-110" />
            <h3 className="text-lg font-semibold mb-2">Classic White Sneaker</h3>
            <p className="text-gray-600">$99.99</p>
          </div>
          <div className="sneaker-card animate__animated animate__zoomIn animate__delay-1s">
            <img src={require('../Assets/Images/sneakers2.webp')} alt="Sneaker 2" className="sneaker-image rounded-lg shadow-lg transition-transform transform hover:scale-110" />
            <h3 className="text-lg font-semibold mb-2">Sporty Black Sneaker</h3>
            <p className="text-gray-600">$129.99</p>
          </div>
          <div className="sneaker-card animate__animated animate__zoomIn animate__delay-2s">
            <img src={require('../Assets/Images/sneakers3.jpg')} alt="Sneaker 3" className="sneaker-image rounded-lg shadow-lg transition-transform transform hover:scale-110" />
            <h3 className="text-lg font-semibold mb-2">Casual Grey Sneaker</h3>
            <p className="text-gray-600">$89.99</p>
          </div>
        </div>
      </section>

      <footer className="bg-gray-800 text-white py-6 mt-12 animate__animated animate__fadeInUp">
        <div className="container mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} Sneaker World. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default SneakerHub;
