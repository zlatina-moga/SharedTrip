const express = require('express');
const { PORT } = require('./config');
const expressConfig = require('./config/express');
const databaseConfig = require('./config/databse');

start()

async function start() {
    const app = express();

    await databaseConfig(app);
    expressConfig(app);

    app.listen(PORT, () => {
        console.log(`Application started at http://localhost:${PORT}`)
    })
}
