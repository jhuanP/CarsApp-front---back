// Access our newly created Mongoose Model
var Car = require('../models/car.model.js')

// Saving the context of this module inside the _the variable
_this = this

// Let's use an Async function to get the To Do List
exports.getCars = async function(query, page, limit){

    // We also want to set up options for the mongoose paginate

    var options = {
        page,
        limit
    }
    //Let's create a Try and Catch function 
//that way we have some error handling set. 
//Waiting for the promise
    
    try {
    var cars = await Car.paginate(query, options)
    
//Once the Mongoose promise is returned 
//we're going to go ahead and return 
//the To Do List it has produced 

    return cars;

    } catch (e) {

//If the try didn't work we're going to 
//go ahead and let the users know what kind of 
//Error we have

    throw Error('Oh No! We got an error while Paginating our To-Do Tasks, so sorry!' )
    }

}//closes export getCar function

exports.createCar = async function(car){
    
    // Creating a new Mongoose Object by using the new keyword
    
        var newCar = new Car({
            model: car.model,
            description: car.description,
            status: car.status,
            price: car.price
        })
    
        try{
    
            // Let's go ahead and save the Car 
    
            var savedCar = await newCar.save()
    
            return savedCar;
        }catch(e){
          
            //if we can't create a Car we want to throw an error 
    
            throw Error("Error while Creating Car")
        }
    }//closes createCar

exports.updateCar = async function(car){
        var id = car.id
    
        try{
            //Find the old Car Object by the Id
        
            var oldCar = await Car.findById(id);
        }catch(e){
            throw Error("Error occured while Finding the Car")
        }
    
        // If no old Car Object exists return false
    
        if(!oldCar){
            return false;
        }
    
        console.log(oldCar)
    
        //Edit the Car Object
    
        oldCar.model = car.model
        oldCar.description = car.description
        oldCar.status = car.status
        oldCar.price = car.price
    
    
        console.log(oldCar)
    
        try{
            var savedCar = await oldCar.save()
            return savedCar;
        }catch(e){
            throw Error("And Error occured while updating the Car");
        }
    }//closes updateCar

exports.deleteCar = async function(id){
    
        // Delete the Car
    
        try{
            var deleted = await Car.deleteOne({_id: id})
            if(deleted.n === 0){
                throw Error("Car Could not be deleted")
            }
            return deleted
        }catch(e){
            throw Error("Error Occured while Deleting the Car")
        }
    }//closes deleteCar


