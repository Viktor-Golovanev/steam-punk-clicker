const express = require('express')
const router = express.Router()
const clanController = require('../controllers/clanController')

router.get('/', clanController.getAllClans)

router.post('/', clanController.createClan)

router.get('/:id', clanController.getClanById)

router.put('/:id', clanController.updateClan)

router.delete('/:id', clanController.deleteClan)

module.exports = router
