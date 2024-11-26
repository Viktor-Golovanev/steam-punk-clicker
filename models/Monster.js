const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const Monster = sequelize.define('Monster', {
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	health: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	attack: {
		type: DataTypes.INTEGER,
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

module.exports = Monster
