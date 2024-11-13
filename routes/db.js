const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://markchristianmusngi:64Ko4gT0miP7JnsT@cluster1.mtd8d.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1';

let db;
let client;

async function connectToDatabase() {
    try {
        client = new MongoClient(uri, {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            ssl: true, // Ensure SSL is enabled
        });

        await client.connect();
        console.log('Connected successfully to server');
        db = client.db('CateringServices');
    } catch (error) {
        console.error('Could not connect to database', error);
        throw error;
    }
}

function getDb() {
    if (!db) {
        throw new Error('Database not connected');
    }
    return db;
}

async function disconnectFromDatabase() {
    if (client) {
        await client.close();
        console.log('Disconnected from database');
    }
}

module.exports = { connectToDatabase, disconnectFromDatabase, getDb };
