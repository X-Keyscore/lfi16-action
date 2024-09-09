const express = require('express')

const ProductCtrl = require('../controllers/product-ctrl')

const router = express.Router()

router.post('/product/create', ProductCtrl.productCreate)

router.get('/product/get', ProductCtrl.productGet)

router.put('/product/update', ProductCtrl.productUpdate)

router.delete('/product/delete/id/:_id', ProductCtrl.productDelete)

module.exports = router
