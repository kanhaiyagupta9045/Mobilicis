require('dotenv').config({ path: './.env' });
const mongoose = require('mongoose');
const uri = process.env.CONNECTION_STRING;

async function connectToDatabase() {
    try {
        await mongoose.connect(uri);
        console.log("Database Connected Successfully");
    } catch (error) {
        console.error("Error connecting to database:", error);
        console.log("Error while connecting Database");
    }
}

connectToDatabase();
