const express = require('express');
const { PORT } = require('./config');
const expressConfig = require('./config/express');
const databaseConfig = require('./config/database');
const routesConfig = require('./config/routes')

start()

async function start() {
    const app = express();

    await databaseConfig(app);
    expressConfig(app);
    routesConfig(app)

    app.listen(PORT, () => {
        console.log(`Application started at http://localhost:${PORT}`)
    })
}
