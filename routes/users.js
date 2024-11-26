const express = require('express')
const router = express.Router()
const Users = require('../models/User')
const bcrypt = require('bcrypt')

async function hashPassword(password) {
	const saltRound = 10
	const hash = await bcrypt.hash(password, saltRound)
	return hash
}

router.get('/', async (req, res) => {
	try {
		s
		const users = await Users.findAll()
		res.json(users)
	} catch (error) {
		console.log({ error: 'Ошибка при получении пользователей', details: error })
		res.status(500).json({ error: 'Ошибка при получении пользователей' })
	}
})

router.post('/', async (req, res) => {
	try {
		let { username, email, password_hash, premium_account } = req.body
		password_hash = await hashPassword(password_hash)
		const newUser = await Users.create({
			username,
			email,
			password_hash,
			premium_account,
		})
		res.json(newUser)
	} catch (error) {
		console.log({ error: 'Ошибка при создании пользователя' })
		res.status(500).json({ error: 'Ошибка при создании пользователя' })
	}
})

router.get('/:username')

module.exports = router
