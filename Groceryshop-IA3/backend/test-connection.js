require('dotenv').config();
const { MongoClient } = require('mongodb');

async function testConnection() {
    const uri = process.env.MONGO_URI;
    const client = new MongoClient(uri);

    try {
        console.log('Attempting to connect to MongoDB...');
        await client.connect();
        console.log('Connected successfully!');
        
        const db = client.db('admin');
        const result = await db.command({ ping: 1 });
        console.log('Ping successful:', result);
    } catch (err) {
        console.error('Error details:', {
            name: err.name,
            message: err.message,
            code: err.code,
            // If there's a detailed error object, print it
            details: err.hasOwnProperty('reason') ? {
                type: err.reason?.type,
                servers: err.reason?.servers ? Array.from(err.reason.servers.keys()) : null
            } : null
        });
    } finally {
        await client.close();
    }
}

testConnection().catch(console.error);