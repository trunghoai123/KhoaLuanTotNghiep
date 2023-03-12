const config = {
    app: {
        port: process.env.DB_PORT,
    },
    db: {
        host : process.env.DB_HOST,
        name: process.env.DB_NAME,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
    }
}

module.exports = config