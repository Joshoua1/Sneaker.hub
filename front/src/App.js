// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SneakerHub from './Pages/Home';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Landing from './Pages/Landing';
import Explore from './Pages/Explore';
import Products from './Pages/Products';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<SneakerHub />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/Landing" element={<Landing />} /> 
          <Route path="/Explore" element={<Explore />} />
          <Route path="/Products" element={<Products />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;