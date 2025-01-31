// controllers/monsterController.js

const Monster = require('../models/Monster')

exports.getAllMonsters = async (req, res) => {
	try {
		const monsters = await Monster.findAll()
		res.json(monsters)
	} catch (error) {
		console.log({ error: 'Ошибка при получении монстров' })
		res.status(500).json({ error: 'Ошибка при получении монстров' })
	}
}

exports.createMonster = async (req, res) => {
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
}

exports.getMonsterById = async (req, res) => {
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
}

exports.updateMonster = async (req, res) => {
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
}

exports.deleteMonster = async (req, res) => {
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
}
