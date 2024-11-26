const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')
const User = require('./User')

const Worker = sequelize.define('Worker', {
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	gather_speed: {
		type: DataTypes.INTEGER,
		defaultValue: 1,
	},
	level: {
		type: DataTypes.INTEGER,
		defaultValue: 1,
	},
})

Worker.belongsTo(User)

module.exports = Worker
