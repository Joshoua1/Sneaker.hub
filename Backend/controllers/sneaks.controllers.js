const Sneaker = require('../models/Sneaker');
const stockXScraper = require('../scrapers/stockx-scraper');
const flightClubScraper = require('../scrapers/flightclub-scraper');
const goatScraper = require('../scrapers/goat-scraper');
const stadiumGoodsScraper = require('../scrapers/stadiumgoods-scraper');

module.exports = class Sneaks {
  constructor() {
    // Class initialization if needed
  }

  async getProducts(keyword, count = 40, callback) {
    var productCounter = 0;
    stockXScraper.getProductsAndInfo(keyword, count, (error, products) => {
      if (error) {
        callback(error, []);
        return;
      }
      
      // Check if products exists and is an array
      if (!products || !Array.isArray(products) || products.length === 0) {
        callback(new Error('No products found or invalid product data'), []);
        return;
      }

      // If no products need to be processed further
      if (products.length === 0) {
        callback(null, []);
        return;
      }

      products.forEach(function (shoe) {
        var cbCounter = 0;
        flightClubScraper.getLink(shoe, function () {
          if (++cbCounter == 3) {
            //if all shoes links have been parsed then return
            if (productCounter++ + 1 == products.length) {
              callback(null, products);
            }
          }
        });

        stadiumGoodsScraper.getLink(shoe, function () {
          if (++cbCounter == 3) {
            //if all shoes links have been parsed then return
            if (productCounter++ + 1 == products.length) {
              callback(null, products);
            }
          }
        });

        goatScraper.getLink(shoe, function () {
          if (++cbCounter == 3) {
            //if all shoes links have been parsed then return
            if (productCounter++ + 1 == products.length) {
              callback(null, products);
            }
          }
        });
      });
    });
  }

  getProductPrices(shoeID, callback) {
    this.getProducts(shoeID, 1, (error, products) => {
      if (error) {
        console.log(new Error("No Products Found"));
        callback(new Error("No Products Found"), null);
        return;
      }
      
      if (!products || !Array.isArray(products) || products.length === 0) {
        console.log(new Error("No Products Found"));
        callback(new Error("No Products Found"), null);
        return;
      }
      
      if (products[0].styleID.toLowerCase() != shoeID.toLowerCase()) {
        console.log(new Error("No Matching Products Found"));
        callback(new Error("No Matching Products Found"), null);
        return;
      }
      
      this.getPrices(products[0], callback);
    });
  }

  getPrices(shoe, callback) {
    var cbCounter = 0;
    stockXScraper.getPrices(shoe, function (err) {
      if (err) console.log(err);
      cbCounter++;
      if (cbCounter == 5) {
        callback(null, shoe);
      }
    });
    
    stadiumGoodsScraper.getPrices(shoe, function (err) {
      if (err) console.log(err);
      cbCounter++;
      if (cbCounter == 5) {
        callback(null, shoe);
      }
    });
    
    flightClubScraper.getPrices(shoe, function (err) {
      if (err) console.log(err);
      cbCounter++;
      if (cbCounter == 5) {
        callback(null, shoe);
      }
    });
    
    goatScraper.getPrices(shoe, function (err) {
      if (err) console.log(err);
      cbCounter++;
      if (cbCounter == 5) {
        callback(null, shoe);
      }
    });
    
    goatScraper.getPictures(shoe, function (err) {
      if (err) console.log(err);
      cbCounter++;
      if (cbCounter == 5) {
        callback(null, shoe);
      }
    });
  }

  getMostPopular(count, callback) {
    this.getProducts("", count, function (error, products) {
      if (error) {
        callback(error, []);
      } else {
        callback(null, products);
      }
    });
  }
}