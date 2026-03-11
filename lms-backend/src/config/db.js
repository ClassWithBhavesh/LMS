
const mongoose = require('mongoose');

const connDb = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`database connected: ${conn.connection.host}`);
    } catch (err) {
        console.log(`Database Connection failed! \n ${err}`);
        process.exit(1);
    }       
}

module.exports = connDb;