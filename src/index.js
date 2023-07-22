const config = require('./config');

const start = async () => {
    console.info('[APP] - Starting application...');
    await config.load();
    const server = require('./server');
    const db = require('./db');

    try {
        const mongodbConnection = await db.mongoConnect();
        await server.start(mongodbConnection);
        console.info('[APP] - Application started. 🚀');
    } catch (err) {
        console.error('[APP] - Failed starting application. Exiting... 👋');
        process.exit(1);
    }
};

start();
