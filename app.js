const express = require('express')
const sequelize = require('./config/database')
const bossesRoutes = require('./routes/bosses')
const clansRoutes = require('./routes/clans')
const equipmentsRoutes = require('./routes/equipments')
const eventRoutes = require('./routes/events')
const monstersRoutes = require('./routes/monsters')
const usersRoutes = require('./routes/users')

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

app.use('/bosses', bossesRoutes)
app.use('/clans', clansRoutes)
app.use('/equipments', equipmentsRoutes)
app.use('/events', eventRoutes)
app.use('/monsters', monstersRoutes)
app.use('/users', usersRoutes)

sequelize
	.authenticate()
	.then(() => {
		console.log('Подключение к базе данных успешно')
	})
	.catch(error => {
		console.log('Не удалось подключиться к базе данных: ', error)
	})

sequelize
	.sync({ force: true })
	.then(() => {
		console.log('Модели синхронизированы с базой данных')
		return sequelize.getQueryInterface().showAllTables()
	})
	.then(tables => {
		console.log('Таблицы в базе данных', tables)
	})
	.catch(err => {
		console.error('Ошибка синхронизации моделей:', err)
	})

app.listen(PORT, () => {
	console.log(`Сервер запущен по адресу http://localhost:${PORT}`)
})
