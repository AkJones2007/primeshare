var express = require('express');
var router = express.Router();
var Place = require('../models/place');

// Show All
router.get('/', function(req, res) {
    Place.find({}, function(error, data) {
       return error ? console.error(error) : res.json(data);
    });
});

// Create
router.post('/', function(req, res) {
    Place.create(req.body, function(error, data) {
        return error ? console.error(error) : res.json(req.body);
    });
});

module.exports = router;