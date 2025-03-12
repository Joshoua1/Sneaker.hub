import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    brand: 'all',
    gender: 'all',
    priceRange: 'all',
    sort: 'popular'
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [activeProductId, setActiveProductId] = useState(null);

  // Fetch products using sneaks-api
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // In a real implementation, you would call your backend API
        // which uses the sneaks-api Node.js package
        const response = await fetch('http://localhost:5000/api/sneakers');
        
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please try again later.');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter and sort products
  const filteredProducts = products.filter(product => {
    // Filter by brand
    if (filters.brand !== 'all' && product.brand !== filters.brand) {
      return false;
    }
    
    // Filter by gender - Note: Adjust if your API uses a different field for gender
    if (filters.gender !== 'all' && product.gender !== filters.gender) {
      return false;
    }
    
    // Filter by price range
    if (filters.priceRange !== 'all') {
      const price = parseFloat(product.retailPrice || 0);
      
      if (filters.priceRange === 'under100' && price >= 100) {
        return false;
      } else if (filters.priceRange === '100to200' && (price < 100 || price > 200)) {
        return false;
      } else if (filters.priceRange === 'over200' && price <= 200) {
        return false;
      }
    }
    
    // Search query filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        (product.shoeName || '').toLowerCase().includes(query) ||
        (product.brand || '').toLowerCase().includes(query) ||
        (product.colorway || '').toLowerCase().includes(query)
      );
    }
    
    return true;
  }).sort((a, b) => {
    // Sort products
    if (filters.sort === 'priceLow') {
      return (parseFloat(a.retailPrice) || 0) - (parseFloat(b.retailPrice) || 0);
    } else if (filters.sort === 'priceHigh') {
      return (parseFloat(b.retailPrice) || 0) - (parseFloat(a.retailPrice) || 0);
    } else if (filters.sort === 'newest') {
      return new Date(b.releaseDate) - new Date(a.releaseDate);
    }
    
    // Default: popular (by resell price)
    return (parseFloat(b.lowestResellPrice?.stockX) || 0) - (parseFloat(a.lowestResellPrice?.stockX) || 0);
  });

  // Handle filter changes
  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  // Handle search input
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle adding to cart (you'll implement actual cart functionality)
  const handleAddToCart = (productId) => {
    console.log(`Adding product ${productId} to cart`);
    // Add your cart logic here
  };

  // Toggle product quick view
  const toggleQuickView = (productId) => {
    setActiveProductId(activeProductId === productId ? null : productId);
  };
  
  // Helper function to get the lowest resell price
  const getLowestResellPrice = (product) => {
    if (!product.lowestResellPrice) return null;
    
    const prices = [
      product.lowestResellPrice.stockX || Infinity,
      product.lowestResellPrice.goat || Infinity,
      product.lowestResellPrice.flightClub || Infinity,
      product.lowestResellPrice.stadiumGoods || Infinity
    ];
    
    const lowestPrice = Math.min(...prices);
    return lowestPrice === Infinity ? null : lowestPrice;
  };

  // Helper function to get the best available image
  const getProductImage = (product) => {
    // Check for thumbnail first
    if (product.thumbnail) {
      return product.thumbnail;
    }
    
    // If there are imageLinks, use the first one
    if (product.imageLinks && product.imageLinks.length > 0) {
      return product.imageLinks[0];
    }
    
    // Fallback to placeholder
    return "https://placehold.co/400?text=No+Image";
  };

  return (
    <div className="font-sans bg-gray-50 min-h-screen">
      {/* Navigation bar would be here - but should be shared with your Landing page */}
      {/* Page content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero section */}
        <div className="relative mb-12">
          <div className="h-64 sm:h-80 bg-gray-900 rounded-2xl overflow-hidden">
            <img 
              src={require('../Assets/Images/background.jpg')}
              alt="Sneakers collection" 
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Our Sneaker Collection</h1>
              <p className="text-xl text-white max-w-2xl">Discover the perfect pair from our extensive selection of premium sneakers</p>
            </div>
          </div>
        </div>

        {/* Filters and search */}
        <div className="mb-8 bg-white p-4 rounded-lg shadow-md">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <select 
                value={filters.brand} 
                onChange={(e) => handleFilterChange('brand', e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="all">All Brands</option>
                <option value="Nike">Nike</option>
                <option value="Adidas">Adidas</option>
                <option value="Jordan">Jordan</option>
                <option value="New Balance">New Balance</option>
                <option value="Puma">Puma</option>
              </select>

              <select 
                value={filters.gender} 
                onChange={(e) => handleFilterChange('gender', e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="all">All Genders</option>
                <option value="men">Men</option>
                <option value="women">Women</option>
                <option value="unisex">Unisex</option>
              </select>

              <select 
                value={filters.priceRange} 
                onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="all">All Prices</option>
                <option value="under100">Under $100</option>
                <option value="100to200">$100 - $200</option>
                <option value="over200">Over $200</option>
              </select>

              <select 
                value={filters.sort} 
                onChange={(e) => handleFilterChange('sort', e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="popular">Popular</option>
                <option value="priceLow">Price: Low to High</option>
                <option value="priceHigh">Price: High to Low</option>
                <option value="newest">Newest</option>
              </select>
            </div>

            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Search sneakers..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <svg 
                className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Products count and results */}
        {!loading && !error && (
          <div className="mb-6">
            <p className="text-gray-600">Showing {filteredProducts.length} out of {products.length} sneakers</p>
          </div>
        )}

        {/* Products grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6">
            <strong className="font-bold">Error:</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <h3 className="text-xl font-medium text-gray-900 mb-2">No sneakers found</h3>
            <p className="text-gray-600">Try adjusting your filters or search terms</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <div 
                key={product._id}
                className="bg-white rounded-lg shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="relative overflow-hidden" style={{ height: "280px" }}>
                  <img
                    src={getProductImage(product)}
                    alt={product.shoeName}
                    className="w-full h-full object-contain p-2"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://placehold.co/400?text=No+Image";
                    }}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <button 
                      onClick={() => toggleQuickView(product._id)}
                      className="bg-white text-black px-4 py-2 rounded-md font-medium transform -translate-y-4 group-hover:translate-y-0 transition-all duration-300"
                    >
                      Quick View
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <div className="mb-2">
                    <span className="text-sm text-gray-500">{product.brand}</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-1 truncate">{product.shoeName}</h3>
                  <p className="text-gray-600 mb-1">{product.colorway}</p>
                  <div className="flex justify-between items-center mb-4">
                    <p className="text-lg font-medium">${product.retailPrice || 'N/A'}</p>
                    {product.lowestResellPrice?.stockX && (
                      <p className="text-sm text-gray-500">Resell: ${product.lowestResellPrice.stockX}</p>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleAddToCart(product._id)}
                      className="flex-1 bg-black text-white py-2 rounded-md hover:bg-gray-800 transition duration-300"
                    >
                      Add to Cart
                    </button>
                    <button className="flex-none w-10 h-10 bg-red-50 text-red-500 rounded-md flex items-center justify-center transition duration-300 hover:bg-red-500 hover:text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Quick view modal */}
                {activeProductId === product._id && (
                  <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-auto overflow-hidden">
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/2 p-6 flex items-center justify-center" style={{ height: "500px" }}>
                          <img 
                            src={getProductImage(product)} 
                            alt={product.shoeName} 
                            className="max-w-full max-h-full object-contain"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "https://placehold.co/400?text=No+Image";
                            }}
                          />
                        </div>
                        <div className="md:w-1/2 p-6 flex flex-col">
                          <div className="flex justify-between items-start">
                            <div>
                              <span className="text-sm text-gray-500">{product.brand}</span>
                              <h2 className="text-2xl font-bold mb-2">{product.shoeName}</h2>
                            </div>
                            <button 
                              onClick={() => toggleQuickView(product._id)}
                              className="text-gray-400 hover:text-black transition-colors"
                            >
                              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                          
                          <p className="text-gray-600 mb-4">{product.colorway}</p>
                          
                          <div className="mb-4">
                            <span className="text-2xl font-bold">${product.retailPrice || 'N/A'}</span>
                            {getLowestResellPrice(product) && (
                              <p className="text-sm text-gray-500">Resell from: ${getLowestResellPrice(product)}</p>
                            )}
                          </div>
                          
                          <div className="mb-6">
                            <h3 className="font-medium mb-2">Description</h3>
                            <div className="text-gray-600 max-h-40 overflow-y-auto">
                              {product.description ? (
                                <div dangerouslySetInnerHTML={{ __html: product.description }} />
                              ) : (
                                'No description available.'
                              )}
                            </div>
                          </div>
                          
                          <div className="mb-6">
                            <h3 className="font-medium mb-2">Details</h3>
                            <ul className="text-gray-600 space-y-1">
                              <li><span className="font-medium">Style:</span> {product.silhoutte || product.make || product.styleID}</li>
                              <li><span className="font-medium">Style ID:</span> {product.styleID}</li>
                              <li><span className="font-medium">Release Date:</span> {product.releaseDate ? new Date(product.releaseDate).toLocaleDateString() : 'Unknown'}</li>
                            </ul>
                          </div>
                          
                          {/* Marketplace Links */}
                          {product.resellLinks && Object.keys(product.resellLinks).length > 0 && (
                            <div className="mb-6">
                              <h3 className="font-medium mb-2">Marketplace Links</h3>
                              <div className="flex space-x-2">
                                {product.resellLinks.stockX && (
                                  <a 
                                    href={product.resellLinks.stockX} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded text-sm"
                                  >
                                    StockX
                                  </a>
                                )}
                                {product.resellLinks.goat && (
                                  <a 
                                    href={product.resellLinks.goat} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded text-sm"
                                  >
                                    GOAT
                                  </a>
                                )}
                                {product.resellLinks.flightClub && (
                                  <a 
                                    href={product.resellLinks.flightClub} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded text-sm"
                                  >
                                    Flight Club
                                  </a>
                                )}
                              </div>
                            </div>
                          )}
                          
                          <div className="mt-auto flex space-x-4">
                            <button 
                              onClick={() => handleAddToCart(product._id)}
                              className="flex-1 bg-black text-white py-3 rounded-md font-medium hover:bg-gray-800 transition duration-300"
                            >
                              Add to Cart
                            </button>
                            <button className="w-12 h-12 bg-red-50 text-red-500 rounded-md flex items-center justify-center transition duration-300 hover:bg-red-500 hover:text-white">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Pagination might go here */}
      </main>
    </div>
  );
}

export default Products;