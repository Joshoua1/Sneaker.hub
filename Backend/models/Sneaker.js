const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SneakerSchema = new Schema({
  shoeName: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  styleID: {
    type: String,
    required: true,
    unique: true
  },
  silhoutte: String,
  make: String,
  colorway: String,
  retailPrice: Number,
  releaseDate: String,
  description: String,
  thumbnail: String,
  urlKey: String,
  resellLinks: {
    stockX: String,
    goat: String,
    flightClub: String,
    stadiumGoods: String
  },
  lowestResellPrice: {
    stockX: { type: Number, default: 0 },
    goat: { type: Number, default: 0 },
    flightClub: { type: Number, default: 0 },
    stadiumGoods: { type: Number, default: 0 }
  },
  resellPrices: {
    stockX: { type: Map, of: Number },
    goat: { type: Map, of: Number },
    flightClub: { type: Map, of: Number },
    stadiumGoods: { type: Map, of: Number }
  },
  goatProductId: String,
  imageLinks: [String],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Sneaker', SneakerSchema);