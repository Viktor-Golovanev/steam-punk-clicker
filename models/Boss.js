const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const Boss = sequelize.define('Boss', {
	name: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: false,
	},
	health: {
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
	spawn_interval: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
})

module.exports = Boss
