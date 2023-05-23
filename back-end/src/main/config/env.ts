export default {
    jwtSecret: process.env.SECRET ?? 'EQWsdewWD',
    port: process.env.PORT ?? '5050',
    dbDatabase: process.env.DB_DATABASE ?? 'cms_brave',
    dbUserName: process.env.DB_USERNAME ?? 'root',
    dbPassword: process.env.DB_PASSWORD ?? 'example',
    dbHost: process.env.DB_HOST ?? 'db', // host container docker mysql
}
