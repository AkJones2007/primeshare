var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var placeSchema = Schema({
  state: { type: String, required: true },
  county: { type: String, required: true },
  city: { type: String, required: true },
  neighborhood: String,
  latitude: { type: String, required: true },
  longitude: { type: String, required: true },
  name: String
});

var Place = mongoose.model('Place', placeSchema);

module.exports = Place;
