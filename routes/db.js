const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://markchristianmusngi:64Ko4gT0miP7JnsT@cluster1.mtd8d.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1';

let db;
let client; // Declare the client variable outside of the connect function

async function connectToDatabase() {
    client = new MongoClient(uri);
    try {
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
        await client.close(); // Close the MongoDB client connection
        console.log('Disconnected from database');
    }
}

module.exports = { connectToDatabase,disconnectFromDatabase, getDb };
