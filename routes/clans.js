const express = require('express')
const router = express.Router()
const Clan = require('../models/Clan')

router.get('/', async (req, res) => {
	try {
		const clans = await Clan.findAll()
		res.json(clans)
	} catch (error) {
		console.error('Ошибка при получении кланов:', error)
		res.status(500).json({ error: 'Ошибка при получении кланов' })
	}
})

router.post('/', async (req, res) => {
	try {
		const { name, leader_id } = req.body
		const newClan = await Clan.create({ name, leader_id })
		res.status(201).json(newClan)
	} catch (error) {
		console.error('Ошибка при создании клана:', error)
		res.status(500).json({ error: 'Ошибка при создании клана' })
	}
})

router.get('/:id', async (req, res) => {
	try {
		const clanId = req.params.id
		const clan = await Clan.findByPk(clanId)
		if (!clan) {
			return res.status(404).json({ error: 'Клан не найден' })
		}
		res.json(clan)
	} catch (error) {
		console.error('Ошибка при получении клана:', error)
		res.status(500).json({ error: 'Ошибка при получении клана' })
	}
})

router.put('/:id', async (req, res) => {
	try {
		const clan = await Clan.findByPk(req.params.id)
		if (!clan) {
			return res.status(404).json({ error: 'Клан не найден' })
		}
		const updateClan = await clan.update(req.body)
		res.json(updateClan)
	} catch (error) {
		console.error('Ошибка при обновлении клана:', error)
		res.status(500).json({ error: 'Ошибка при обновлении клана' })
	}
})

router.delete('/:id', async (req, res) => {
	try {
		const clan = await Clan.findByPk(req.params.id)
		if (!clan) {
			return res.status(404).json({ error: 'Клан не найден' })
		}
		await clan.destroy()
		res.status(204).send()
	} catch (error) {
		console.error('Ошибка при удалении клана:', error)
		res.status(500).json({ error: 'Ошибка при удалении клана' })
	}
})

module.exports = router