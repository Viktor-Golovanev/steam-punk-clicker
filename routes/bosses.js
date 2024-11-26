const express = require('express')
const router = express.Router()
const Boss = require('../models/Boss')

router.get('/', async (req, res) => {
	try {
		const bosses = await Boss.findAll()
		res.json(bosses)
	} catch (error) {
		console.log('Ошибка при получение боссов: ', error)
		res.status(500).json({ error: 'Ошибка при получение боссов' })
	}
})

router.post('/', async (req, res) => {
	try {
		const { name, health, reward_type, reward_value, spawn_interval } = req.body
		const newBoss = await Boss.create({
			name,
			health,
			reward_type,
			reward_value,
			spawn_interval,
		})
		console.log('Созданный босс')
		console.log(req.body)
		res.status(201).json(newBoss)
	} catch (error) {
		console.error('Ошибка при создании босса:', error)
		res.status(500).json({ error: 'Ошибка при создании босса' })
	}
})

router.get('/:id', async (req, res) => {
	try {
		const boss = await Boss.findByPk(req.params.id)
		if (!boss) {
			return res.status(404).json({ error: 'Босс не найден' })
		}
		res.json(boss)
	} catch (error) {
		console.error('Ошибка при получении босса:', error)
		res.status(500).json({ error: 'Ошибка при получении босса' })
	}
})

router.put('/:id', async (req, res) => {
	try {
		const boss = await Boss.findByPk(req.params.id)
		if (!boss) {
			return res.json({ error: 'Босс не найден' })
		}
		const updateBoss = await boss.update(req.body)
		res.json(updateBoss)
	} catch (error) {
		console.error('Ошибка при обновлении босса:', error)
		res.status(500).json({ error: 'Ошибка при обновлении босса' })
	}
})

router.delete('/:id', async (req, res) => {
	try {
		const boss = await Boss.findByPk(req.params.id)
		if (!boss) {
			res.status(404).json({ error: 'Босс не найден' })
		}
		await boss.destroy()
		res.status(204).send()
	} catch (error) {
		console.error('Ошибка при удалении босса:', error)
		res.status(500).json({ error: 'Ошибка при удалении босса' })
	}
})

module.exports = router
