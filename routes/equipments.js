const express = require('express')
const router = express.Router()
const Equip = require('../models/Equipment')

router.get('/', async (req, res) => {
	try {
		const equip = await Equip.findAll()
		res.json(equip)
	} catch (error) {
		console.log({ error: 'Ошибка при получении снаряжения' })
		res.status(500).json({ error: 'Ошибка при получении снаряжения' })
	}
})

router.post('/', async (req, res) => {
	try {
		const { name, description, effect_type, effect_value, rarity } = req.body
		const equip = await Equip.create({
			name,
			description,
			effect_type,
			effect_value,
			rarity,
		})
		res.status(201).json(equip)
	} catch (error) {
		console.log({ error: 'Ошибка при создании снаряжения' })
		res.status(500).json({ error: 'Ошибка при создании снаряжения' })
	}
})

router.get('/:id', async (req, res) => {
	try {
		const equip = await Equip.findByPk(req.params.id)
		if (!equip) {
			return res.status(404).json({ error: 'Предмет не найден' })
		}
		res.json(equip)
	} catch (error) {
		console.log({ error: 'Ошибка при получении снаряжения' })
		res.status(500).json({ error: 'Ошибка при получении снаряжения' })
	}
})

router.put('/:id', async (req, res) => {
	try {
		const equip = await Equip.findByPk(req.params.id)
		if (!equip) {
			return res.status(404).json({ error: 'Предмет не найден' })
		}
		const newEquip = await equip.update(req.body)
		res.json(newEquip)
	} catch (error) {
		console.log({ error: 'Ошибка при обновление снаряжения' })
		res.status(500).json({ error: 'Ошибка при обновление снаряжения' })
	}
})

router.delete('/:id', async (req, res) => {
	try {
		const equip = await Equip.findByPk(req.params.id)
		if (!equip) {
			return res.status(404).json({ error: 'Предмет не найден' })
		}
		await equip.destroy()
		res.status(204).send()
	} catch (error) {
		console.log({ error: 'Ошибка при удалении снаряжения' })
		res.status(500).json({ error: 'Ошибка при удалении снаряжения' })
	}
})

module.exports = router
