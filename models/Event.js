const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const Event = sequelize.define('Event', {
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	description: {
		type: DataTypes.TEXT,
	},
	start_at: {
		type: DataTypes.DATE,
		allowNull: false,
	},
	end_at: {
		type: DataTypes.DATE,
		allowNull: false,
	},
	reward_type: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	reward_value: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
})

module.exports = Event
