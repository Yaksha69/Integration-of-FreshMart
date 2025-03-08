const express = require('express')
const router = express.Router()

const {
    createSale
} = require('./controller')

router.post('/add', createSale)


module.exports = router