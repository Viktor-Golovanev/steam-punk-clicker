const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

router.get('/', userController.getAllUsers)

router.post('/register', userController.createUser)

router.post('/login', userController.loginUser)

router.get('/:username', userController.getUserByUsername)

module.exports = router
