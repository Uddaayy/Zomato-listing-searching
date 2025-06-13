const { MongoClient } = require('mongodb');
const fs = require('fs');

const uri = "mongodb+srv://udayprabhas005:prabhas005@udaycluster.5v1ky.mongodb.net/";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function uploadData() {
    try {
        await client.connect();

        const database = client.db('Content');
        const collection = database.collection('proZom');

        const data = JSON.parse(fs.readFileSync('./file5.json', 'utf8'));

        const result = await collection.insertMany(data);
        console.log(`${result.insertedCount} documents were inserted.`);
    } catch (err) {
        console.error('Error:', err);
    } finally {
        await client.close();
    }
}

uploadData();