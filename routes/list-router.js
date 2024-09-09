const express = require('express')

const ListCtrl = require('../controllers/list-ctrl')

const router = express.Router()

router.post('/list/create', ListCtrl.listCreate)

router.get('/list/get', ListCtrl.listGet)

router.put('/list/title/update', ListCtrl.listTitleUpdate)

router.put('/list/products/move', ListCtrl.listProductsMove)

router.delete('/list/delete/id/:_id', ListCtrl.listDelete)

module.exports = router
