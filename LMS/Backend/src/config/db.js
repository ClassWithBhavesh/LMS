const mongoose = require("mongoose");

const connDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_CONN_URI);
    console.log(`Database Connection Established at ${conn.connection.host}`);
  } catch (error) {
    console.log(`Database Connection Failed! \n following is the error : \n ${error}`);
  }
};

module.exports = connDB;
