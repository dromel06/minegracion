
const { MongoClient } = require('mongodb');

let db;
let client;

const connectToDatabase = async () => {
    try {
        client = new MongoClient(process.env.MONGODB_URI);
        await client.connect();
        db = client.db();
        console.log('Conectado a MongoDB Atlas');
    } catch (error) {
        console.error('Error conectando a MongoDB:', error);
        process.exit(1);
    }
};

const getCollection = (collectionName) => {
    if (!db) {
        throw new Error('Base de datos no inicializada');
    }
    return db.collection(collectionName);
};

const closeDatabase = async () => {
    if (client) {
        await client.close();
    }
};

module.exports = {
    connectToDatabase,
    getCollection,
    closeDatabase
};