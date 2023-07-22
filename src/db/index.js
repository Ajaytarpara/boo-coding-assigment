const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const mongoConnect = async () => {
  console.info('[DB] - Attempting MongoDB database connection...');

  try {
    const mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    await mongoose.connect(uri);
    console.info(`[DB] - Connected to MongoDB database.`); //${config.connection.database}
    return mongoose;
  } catch (err) {
    console.log('[DB] - Failed connecting to MongoDB database: ', err.message);
    throw err;
  }
};

module.exports = { mongoConnect };

