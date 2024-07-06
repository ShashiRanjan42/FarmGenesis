const express = require('express')
const router = express.Router()

const { addFarmer, FarmerDetails , UniqueFarmerDetails} = require('../controller/FarmerController')

router.post('/', addFarmer)
router.get('/Farmers', FarmerDetails)
router.get('/UniqueFarmer/:id', UniqueFarmerDetails)

module.exports = router