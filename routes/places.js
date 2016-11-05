var express = require('express');
var router = express.Router();
var Place = require('../models/place');
var format = require('../utilities/format');
var error = require('../utilities/error');
var validate = require('../utilities/validate');
var NodeGeocoder = require('node-geocoder');
var geocoder = NodeGeocoder({
    provider: 'google',
    apiKey: 'AIzaSyD_6QyzzASNtB-2vSjs1kuvXXcIV00uLjA'
});

// Index
router.get('/', function(req, res) {
    var allowedParams = [ 'state', 'county', 'city', 'neighborhood', 'name' ];

    if (!validate.queryParams(req.query, allowedParams)) {
        res.status(400).json({
            error: error.invalidParams
        });
    }

    Place.find(req.query)
        .then(function(places) {
            if (places.length) {
                res.json({ places: places });
            } else {
                res.status(404).json({
                    error: error.resultsNotFound
                });
            }
        })
        .catch(function(err) {
            res.status(500).json({
                error: error.unknown
            });
        });
});

// Find By ID
router.get('/:id', function(req, res) {
    Place.findOne({ _id: req.params.id })
        .then(function(place) {
            res.json(place);
        })
        .catch(function() {
            res.status(404).json({
                error: error.notFound
            });
        });
});

// Create
router.post('/', function(req, res) {
    if (req.body.address) {
        geocoder.geocode(req.body.address)
            .then(function(data) {
                var place = format.geocodedPlace(data[0]);
                place.name = req.body.name || null;
                return Place.create(place);
            })
            .then(function(place) {
                res.json(place);
            });
    } else if (req.body.latitude && req.body.longitude) {
        geocoder.reverse({ lat: req.body.latitude, lon: req.body.longitude })
            .then(function(data) {
                var place = format.geocodedPlace(data[0]);
                place.name = req.body.name || null;
                return Place.create(place);
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
