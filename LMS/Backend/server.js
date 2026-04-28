const server = require("./src/config/app.js");
const connDB = require("./src/config/db.js");
const dotenv = require('dotenv');

dotenv.config();

connDB();

server.listen(process.env.PORT, (err) => {
    if(!err){
        console.log(`Server is running on ${process.env.PORT}`);
    }else{
        console.log(`Server Connection Failed! \n Following is the error : \n ${err}`);
    }
})
