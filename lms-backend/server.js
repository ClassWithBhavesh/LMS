require("dotenv").config();
const server = require("./src/config/app");
const connDb = require("./src/config/db");

connDb();

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
