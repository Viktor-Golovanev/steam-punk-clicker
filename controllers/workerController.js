const Worker = require('../models/Worker')

exports.getAllWorkers = async (req, res) => {
	try {
		const workers = await Worker.findAll()
		res.json(workers)
	} catch (error) {
		console.error('Ошибка при получении списка рабочих:', error)
		res.status(500).json({ error: 'Не удалось получить список рабочих' })
	}
}

exports.createWorker = async (req, res) => {
	try {
		const { name, gather_speed, level } = req.body
		const newWorker = await Worker.create({
			name,
			gather_speed,
			level,
		})
		console.log('создан рабочий')
		console.log(req.body)
		res.status(200).json(newWorker)
	} catch (error) {
		console.error('Ошибка при создании рабочего:', error)
		res.status(500).json({ error: 'Ошибка при создании рабочего' })
	}
}

exports.getWorkerById = async (req, res) => {
	try {
		const worker = await Worker.findOne(req.params.id)
		if (!worker) {
			return res.status(404).json({ error: 'Рабочий не найден' })
		}
		res.json(worker)
	} catch (error) {
		console.error('Ошибка при получении рабочего:', error)
		res.status(500).json({ error: 'Ошибка при получении рабочего' })
	}
}

exports.updateWorker = async (req, res) => {
	try {
		const worker = await Worker.findByPk(req.params.id)
		if (!worker) {
			return res.json({ error: 'рабочий не найден' })
		}
		const updateWorker = await worker.update(req.body)
		res.json(updateWorker)
	} catch (error) {
		console.error('Ошибка при обновлении рабочего:', error)
		res.status(500).json({ error: 'Ошибка при обновлении рабочий' })
	}
}

exports.deleteWorker = async (req, res) => {
	try {
		const worker = await Worker.findByPk(req.params.id)
		if (!worker) {
			res.status(404).json({ error: 'Рабочий не найден' })
		}
		await worker.destroy()
		res.status(204).send()
	} catch (error) {
		console.error('Ошибка при удалении рабочего:', error)
		res.status(500).json({ error: 'Ошибка при удалении рабочего' })
	}
}
