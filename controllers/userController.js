const Users = require('../models/User')
const bcrypt = require('bcrypt')

exports.getAllUsers = async (req, res) => {
	try {
		const users = await Users.findAll()
		res.json(users)
	} catch (error) {
		console.log({ error: 'Ошибка при получении пользователей', details: error })
		res.status(500).json({ error: 'Ошибка при получении пользователей' })
	}
}

exports.createUser = async (req, res) => {
	try {
		console.log('получаем объект из запроса')
		let { username, email, password, premium_account } = req.body
		console.log('хэшируем пароль')
		password = await bcrypt.hash(password, 10)
		console.log('записываем пользователя в базу данных')
		const newUser = await Users.create({
			username,
			email,
			password,
			premium_account,
		})
		res.json(newUser)
	} catch (error) {
		console.log({ error: 'Ошибка при создании пользователя' })
		res.status(500).json({ error: 'Ошибка при создании пользователя' })
	}
}

exports.loginUser = async (req, res) => {
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

		const inValid = await bcrypt.compare(req.body.password, user.password)
		if (!inValid) {
			console.log('Не верный пароль')
			res.send('Не верный пароль')
			return
		}
		res.status(200).json(user)
	} catch (error) {
		console.log(error)
	}
}

exports.getUserByUsername = async (req, res) => {
	try {
		const user = await Users.findOne({
			where: { username: req.params.username },
		})

		if (!user) {
			console.log('Такого пользователя нет')
			return res.status(404).json({ error: 'Нет такого пользователя' })
		}

		res.status(200).json(user)
	} catch (error) {
		console.log(error)
		res.status(500).json({ error: 'Ошибка при получении пользователя' })
	}
}
