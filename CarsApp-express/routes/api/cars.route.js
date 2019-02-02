var express = require('express')

var router = express.Router()

// Getting the Car Controller that we just created

var CarController = require('../../controllers/car.controller.js');


// Map each API to the Controller Functions

router.get('/', CarController.getCars)

router.post('/', CarController.createCar)

router.put('/', CarController.updateCar)

router.delete('/:id',CarController.removeCar)


// Export the Router

module.exports = router;