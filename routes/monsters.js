// routes/monsters.js

const express = require('express')
const router = express.Router()
const monsterController = require('../controllers/monsterController')

router.get('/', monsterController.getAllMonsters)
router.post('/', monsterController.createMonster)
router.get('/:id', monsterController.getMonsterById)
router.put('/:id', monsterController.updateMonster)
router.delete('/:id', monsterController.deleteMonster)

module.exports = router
