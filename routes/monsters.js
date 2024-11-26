const express = require('express')
const router = express.Router()
const Monster = require('../models/Monster')

router.get('/', async (req, res) => {
	try {
		const monsters = await Monster.findAll()
		res.json(monsters)
	} catch (error) {
		console.log({ error: 'Ошибка при получении монстров' })
		res.status(500).json({ error: 'Ошибка при получении монстров' })
	}
})

router.post('/', async (req, res) => {
	try {
		const { name, health, attack, reward_type, reward_value } = req.body
		const newMonster = await Monster.create({
			name,
			health,
			attack,
			reward_type,
			reward_value,
		})
		res.json(newMonster)
	} catch (error) {
		console.log({ error: 'Ошибка при создании монстров' })
		res.status(500).json({ error: 'Ошибка при создании монстров' })
	}
})

router.get('/:id', async (req, res) => {
	try {
		const monster = await Monster.findByPk(req.params.id)
		if (!monster) {
			return res.status(404).json({ error: 'Монстер не найден' })
		}
		res.json(monster)
	} catch (error) {
		console.log({ error: 'Ошибка при получении монстра' })
		res.status(500).json({ error: 'Ошибка при получении монстра' })
	}
})

router.put('/:id', async (req, res) => {
	try {
		const monster = await Monster.findByPk(req.params.id)
		if (!monster) {
			return res.status(404).json({ error: 'Монстер не найден' })
		}
		await monster.update(req.body)
		res.json(monster)
	} catch (error) {
		console.log({ error: 'Ошибка при обновлении монстра' })
		res.status(500).json({ error: 'Ошибка при обновлении монстра' })
	}
})

router.delete('/:id', async (req, res) => {
	try {
		const monster = await Monster.findByPk(req.params.id)
		if (!monster) {
			return res.status(404).json({ error: 'Монстер не найден' })
		}
		await monster.destroy()
		res.status(204).send()
	} catch (error) {
		console.log({ error: 'Ошибка при удалении монстра' })
		res.status(500).json({ error: 'Ошибка при удалении монстра' })
	}
})

module.exports = router
