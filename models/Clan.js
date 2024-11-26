const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const Clan = sequelize.define('Clan', {
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	leader_id: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
})

module.exports = Clan
