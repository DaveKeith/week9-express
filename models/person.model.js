var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var personSchema = new mongoose.Schema({
    name: String,
    email: String,
})

personSchema.plugin(mongoosePaginate)
const work = mongoose.model('work', personSchema)

module.exports = work;


