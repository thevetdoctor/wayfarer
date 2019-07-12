"use strict";

var express = require('express');

var BusController = require('../controllers/bus'); // const auth = require('../auth');


var router = express.Router();
router.get('/', BusController.getBuses);
module.exports = router;