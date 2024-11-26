const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const Equipment = sequelize.define('Equipment', {
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	description: {
		type: DataTypes.TEXT,
	},
	effect_type: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	effect_value: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	rarity: {
		type: DataTypes.STRING,
		allowNull: false,
	},
})

module.exports = Equipment
