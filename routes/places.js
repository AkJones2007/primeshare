var express = require('express');
var router = express.Router();
var Place = require('../models/place');
var format = require('../utilities/format');
var NodeGeocoder = require('node-geocoder');
var geocoder = NodeGeocoder({
    provider: 'google',
    apiKey: 'AIzaSyD_6QyzzASNtB-2vSjs1kuvXXcIV00uLjA'
});

// Create
router.post('/', function(req, res) {
    if (req.body.address) {
        geocoder.geocode(req.body.address)
            .then(function(data) {
                return Place.create(format.geocodedPlace(data[0]));
            })
            .then(function(place) {
                res.json(place);
            });
    } else if (req.body.latitude && req.body.longitude) {
        geocoder.reverse({ lat: req.body.latitude, lon: req.body.longitude })
            .then(function(data) {
                return Place.create(format.geocodedPlace(data[0]));
            })
            .then(function(place) {
                res.json(place);
            });
    } else {
        res.status(400).json({
            error: {
                message: 'Invalid request. Must provide an address or the longitude/latitude of desired location.'
            }
        })
    }
});

module.exports = router;