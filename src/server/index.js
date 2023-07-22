const app = require('./app');
const config = require('../config');
const checkEnvVariable = require('./middleware/checkEnvVariable');

const start = async (mongodbConnection, postgresConnection) => {
    await checkEnvVariable();
    const port = config.get('PORT');
    console.info('[SERVER] Starting server...');

    app.get('/api', (req, res) => {
        res.status(200).send('Successfully Connected');
    });

    app.get('/mongodb', (req, res) => {
        if (mongodbConnection.connection.readyState === 1) {
            res.status(200).send('MongoDB Database Successfully Connected');
        } else {
            res.status(200).send('MongoDB Database not Connected');
        }
    });

    return new Promise((resolve, reject) => {
        const server = app.listen(port, () => {
            console.info('[SERVER] Server started on port: ', port);
            resolve(server);
        })
            .on('error', err => {
                console.info('[SERVER] Failed starting server:', err.message);
                reject(err);
            });
    });
};

module.exports = { start };
