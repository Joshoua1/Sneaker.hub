module.exports = (app) => {
  const SneaksAPI = require('../controllers/sneaks.controllers.js');
  const sneaksController = new SneaksAPI();
  
  // Root route
  app.get('/', (req, res) => {
    res.status(200).send('Sneaker API is running');
  });
  
  // Get all sneakers (most popular)
  app.get('/api/sneakers', (req, res) => {
    sneaksController.getMostPopular(40, (error, products) => {
      if (error) {
        return res.status(500).send({
          message: error.message || "Some error occurred while retrieving sneakers."
        });
      }
      res.json(products);
    });
  });
  
  // Search sneakers by keyword
  app.get('/api/sneakers/search/:query', (req, res) => {
    sneaksController.getProducts(req.params.query, 40, (error, products) => {
      if (error) {
        return res.status(500).send({
          message: error.message || "Some error occurred while searching for sneakers."
        });
      }
      res.json(products);
    });
  });
  
  // Get sneaker by style ID
  app.get('/api/sneakers/:styleID', (req, res) => {
    sneaksController.getProductPrices(req.params.styleID, (error, product) => {
      if (error) {
        return res.status(500).send({
          message: error.message || "Some error occurred while retrieving the sneaker."
        });
      }
      res.json(product);
    });
  });
};