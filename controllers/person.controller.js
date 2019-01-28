//pull in Service 
var PersonService = require('../services/person.service.js');

// context of module inside the _this variable
_this = this

exports.getPersons = async function (req, res, next) {

    // ternary to check query parameters
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;

    try {

        var persons = await PersonService.getPersons(req.query, page, limit)

        // return person list w/HTTP Status Code and Message.
        return res.status(200).json({ status: 200, data: persons, message: "Succesfully Persons Recieved" });

    } catch (e) {

        //Return error res message w/code.
        return res.status(400).json({ status: 400, message: e.message });

    }
}

exports.createPerson = async function (req, res, next) {

    // Req.Body has form submit values.
    var person = {
        name: req.body.name,
        email: req.body.email
    }

    try {

        // calls Service function w/new object from req b
        var createdPerson = await PersonService.createPerson(person)
        return res.status(201).json({ status: 201, data: createdPerson, message: "Succesfully Created person" })
    } catch (e) {

        //Return error res message w/code.
        return res.status(400).json({ status: 400, message: "person Creation was Unsuccesfull, I am sorry :( " })
    }
}

exports.updatePerson = async function(req, res, next){

    // add Id for update
    if(!req.body._id){
        return res.status(400).json({status: 400., message: "Id must be present"})
    }

    var id = req.body._id;

    var person = {
        id,
        name: req.body.name ? req.body.name : null,
        email: req.body.email ? req.body.email : null
    }


    try{
        var updatedPerson = await PersonService.updatePerson(person)
        return res.status(200).json({status: 200, data: updatedPerson, message: "Succesfully Updated Person"})
    }catch(e){
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.removePerson = async function(req, res, next){

    var id = req.params.id;

    try{
        var deleted = await PersonService.deletePerson(id)
        return res.status(204).json({status:204, message: "Succesfully Person Deleted"})
    }catch(e){
        return res.status(400).json({status: 400, message: e.message})
    }

}


