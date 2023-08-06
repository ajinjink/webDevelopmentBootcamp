const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

let database;

async function connect() {
    const client = await MongoClient.connect('mongodb://localhost:27017'); // return promise
    database = client.db('blog');
} // connection pool

function getDb() {
    if (!database) {
        throw { message: 'Databse connectoin not established!' };
    }
    return database;
}

module.exports = {
    connectToDatabase: connect,
    getDb: getDb
};