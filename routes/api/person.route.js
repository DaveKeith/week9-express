var express = require('express')
var router = express.Router()





// Getting the Todo Controller that we just created
var PersonController = require('../../controllers/person.controller.js');


// Map each API to the Controller FUnctions
router.get('/', PersonController.getPersons)

router.post('/', PersonController.createPerson)

router.put('/', PersonController.updatePerson)

router.delete('/:id',PersonController.removePerson)


// Export the Router
module.exports = router;