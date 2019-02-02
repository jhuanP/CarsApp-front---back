var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var CarSchema = new mongoose.Schema({
    model: String,
    description: String,
    status: String,
    price: String
})

CarSchema.plugin(mongoosePaginate)
const Car = mongoose.model('Car', CarSchema)

module.exports = Car;