var express = require('express')

var router = express.Router()
var cars = require('./api/cars.route')


router.use('/cars', cars);


module.exports = router;