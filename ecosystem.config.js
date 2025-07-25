module.exports = {
    apps: [
        {
            name: 'tasks-api',
            script: 'dist/main.js',
            env: {
                PORT: process.env.PORT,
                DB_HOST: process.env.DB_HOST,
                DB_PORT: process.env.DB_PORT,
                DB_USERNAME: process.env.DB_USERNAME,
                DB_PASSWORD: process.env.DB_PASSWORD,
                DB_DATABASE: process.env.DB_DATABASE,
                JWT_SECRET: process.env.JWT_SECRET,
                NODE_ENV: process.env.NODE_ENV || 'production',
            }
        }
    ]
}
