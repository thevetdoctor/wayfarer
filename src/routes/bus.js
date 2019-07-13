const express = require('express');
const BusController = require('../controllers/bus');
// const auth = require('../auth');

const router = express.Router();


router.get('/', BusController.getBuses);


module.exports = router;
