// CONNECT YOUR DATABASE

const { Sequelize } = require("sequelize")

const db = new Sequelize("postgres://localhost:5432/Spotify")

module.exports = db