const express = require('express')
const router = express.Router()
const Users = require('../models/User')
const bcrypt = require('bcrypt')

async function hashPassword(password, saltRound) {
	const hash = await bcrypt.hash(password, saltRound)
	return hash
}

router.get('/', async (req, res) => {
	try {
		const users = await Users.findAll()
		res.json(users)
	} catch (error) {
		console.log({ error: 'Ошибка при получении пользователей', details: error })
		res.status(500).json({ error: 'Ошибка при получении пользователей' })
	}
})

router.post('/register', async (req, res) => {
	try {
		console.log('получаем объект из запроса')
		let { username, email, password_hash, premium_account } = req.body
		console.log('хэшируем пароль')
		password_hash = await hashPassword(password_hash, 10)
		console.log('записываем пользователя в базу данных')
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

router.post('/login', async (req, res) => {
	try {
		const user = await Users.findOne({
			where: {
				username: req.body.username,
			},
		})

		if (!user) {
			console.log('Пользователя с таким ником нет')
			res.status(404).send('Пользователя с таким ником нет')
			return
		}

		const inValid = await bcrypt.compare(req.body.password, user.password_hash)
		if (!inValid) {
			console.log('Не верный пароль')
			res.send('Не верный пароль')
			return
		}
		res.status(200).json(user)
	} catch (error) {
		console.log(error)
	}
})

router.get('/:username')

module.exports = router
