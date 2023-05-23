import 'module-alias/register'
import dotenv from 'dotenv'
import { setupApp } from '@/main/config/app'
import env  from '@/main/config/env'
import db from '@/infra/db/mysqldb/helpers/connection'

(async () => {
    dotenv.config()
    await db.authenticate()
    console.log('Connection has been established successfully.')
    const port = env.port
    const app = await setupApp()
    app.listen(port, () => console.log(`Server running at http://localhost:${port}`))
})()
