// Access our newly created Mongoose Model
var Person = require('../models/person.model.js')

// Let's use an Async function to get the To Do List
exports.getPersons = async function(query, page, limit){

    // We also want to set up options for the mongoose paginate

    var options = {
        page,
        limit
    }

    //Let's create a Try and Catch function that way we have some error handling set. Waiting for the promise
        
    try {
        var people = await Person.paginate(query, options)
        
        //Once the Mongoose promise is returned we're going to go ahead and return the To Do List it has produced 

        return people;

    } catch (e) {

        //If the try didn't work we're going to go ahead and let the users know what kind of error we have

        throw Error('Oh No! We got an error while paginating, so sorry!' )
    }
}

exports.createPerson = async function(person){
    
    // Creating anew Mongoose Object by using the new keyword

    var newPerson = new Person({
        name: person.name,
        email: person.email,
    })

    try{


        var savedPerson = await newPerson.save()

        return savedPerson;
    }catch(e){
      

        throw Error("Error while creating Person")
    }
}

exports.updatePerson = async function(person){
    var id = person.id

    try{
    
        var oldPerson = await Person.findById(id);
    }catch(e){
        throw Error("Error occured while finding the Person")
    }


    if(!oldPerson){
        return false;
    }

    console.log(oldPerson)


    oldPerson.name = person.name;
    oldPerson.email = person.email;

    console.log(oldPerson)

    try{
        var savedPerson = await oldPerson.save()
        return savedPerson;
    }catch(e){
        throw Error("An error occured while updating the Person");
    }
}

exports.deletePerson = async function(id){
    

    try{
        var deleted = await Person.deleteOne({_id: id})
        if(deleted.n === 0){
            throw Error("Person could not be deleted")
        }
        return deleted
    }catch(e){
        throw Error("Error occured while deleting the Person")
    }
}