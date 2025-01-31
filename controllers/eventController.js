const Event = require('../models/Event')

exports.getAllEvents = async (req, res) => {
	try {
		const event = await Event.findAll()
		res.json(event)
	} catch (error) {
		console.log({ error: 'Ошибка при получении событий' })
		res.status(500).json({ error: 'Ошибка при получении событий' })
	}
}

exports.createEvent = async (req, res) => {
	try {
		const { name, description, start_at, end_at, reward_type, reward_value } =
			req.body
		const newEvent = await Event.create({
			name,
			description,
			start_at,
			end_at,
			reward_type,
			reward_value,
		})
		res.json(newEvent)
	} catch (error) {
		console.log({ error: 'Ошибка при создании событий' })
		res.status(500).json({ error: 'Ошибка при создании событий' })
	}
}

exports.getEventById = async (req, res) => {
	try {
		const event = await Event.findByPk(req.params.id)
		if (!event) {
			res.status(404).json({ error: 'Событие не найдено' })
		}
		res.json(event)
	} catch (error) {
		console.log({ error: 'Ошибка при получении событий' })
		res.status(500).json({ error: 'Ошибка при получении событий' })
	}
}

exports.updateEvent = async (req, res) => {
	try {
		const event = await Event.findByPk(req.params.id)
		if (!event) {
			res.status(404).json({ error: 'Событие не найдено' })
		}
		await event.update(req.body)
		res.json(event)
	} catch (error) {
		console.log({ error: 'Ошибка при обновлении событий' })
		res.status(500).json({ error: 'Ошибка при обновлении событий' })
	}
}

exports.deleteEvent = async (req, res) => {
	try {
		const event = await Event.findByPk(req.params.id)
		if (!event) {
			res.status(404).json({ error: 'Событие не найдено' })
		}
		event.destroy()
		res.status(204).send()
	} catch (error) {
		console.log({ error: 'Ошибка при удалении событий' })
		res.status(500).json({ error: 'Ошибка при удалении событий' })
	}
}
