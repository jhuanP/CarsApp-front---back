// We need to be able to access the Service 
//that we just created so let's pull that in

var CarService = require('../services/car.service.js');

// Make sure to save the context of 
//this module inside the _this variable

_this = this

exports.getCars = async function(req, res, next){

    // We're going to use ternary to check 
    //the existence of the query parameters
        
        var page = req.query.page ? req.query.page : 1
        var limit = req.query.limit ? req.query.limit : 10; 
    
        try{
        
            var cars = await CarService.getCars({}, page, limit)
            
    // Return the cars list with the appropriate 
    //HTTP Status Code and Message.
            
            return res.status(200).json({status: 200, data: cars, message: "Succesfully Cars Recieved"});
            
        }catch(e){
            
    //Return an Error Response Message 
    //with Code and the Error Message.
            
            return res.status(400).json({status: 400, message: e.message});
            
        }
}//closes getCars

exports.createCar = async function(req, res, next){

        // Note: Req.Body contains the form submit values.
    
        var car = {
            model: req.body.model,
            description: req.body.description,
            status: req.body.status,
            price: req.body.price
        }
    
    // Calling the Service function 
    //with the new object from the Request Body
        try{
            var createdCar = await CarService.createCar(car)
            return res.status(201).json({status: 201, data: createdCar, message: "Succesfully Created Car"})
        }catch(e){
            
    //Return an Error Response Message 
    //with Code and the Error Message.
            
        return res.status(400).json({status: 400, message: "Car Creation was Unsuccesfull, I am sorry :( "})
        }
}//closes createCar

exports.updateCar = async function(req, res, next){

        // Id is necessary for the update
    
        if(!req.body._id){
            return res.status(400).json({status: 400, message: "Id must be present"})
        }
    
        var id = req.body._id;
    
        console.log(req.body)
    
        var car = {
            id,
            model: req.body.model ? req.body.model : null,
            description: req.body.description ? req.body.description : null,
            status: req.body.status ? req.body.status : null,
            price: req.body.price ? req.body.price : null

        }
    
        try{
            var updatedCar = await CarService.updateCar(car)
            return res.status(200).json({status: 200, data: updatedCar, message: "Succesfully Updated Car"})
        }catch(e){
            return res.status(400).json({status: 400, message: e.message})
        }
}//closes updateCar

exports.removeCar = async function(req, res, next){

    var id = req.params.id;

    try{
        var deleted = await CarService.deleteCar(id)
        return res.status(204).json({status:204, message: "Succesfully Deleted Car"})
    }catch(e){
        return res.status(400).json({status: 400, message: e.message})
    }

}//closes removeCar
