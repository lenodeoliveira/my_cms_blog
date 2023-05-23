import { Sequelize } from 'sequelize'
import env from '@/main/config/env'

const sequelize = new Sequelize(env.dbDatabase, env.dbUserName, env.dbPassword, {
    host: env.dbHost,
    dialect: 'mysql'
})

export default sequelize