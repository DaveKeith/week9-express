var express = require('express')

var router = express.Router()
var person = require('./api/person.route')


router.use('/person', person);


module.exports = router;