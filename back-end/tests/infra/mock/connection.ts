import { Sequelize } from 'sequelize'
const sequelize = new Sequelize('sqlite::memory:') // Example for sqlite

export default sequelize