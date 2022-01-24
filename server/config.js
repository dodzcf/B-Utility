const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  database: process.env.DATABASE,
  port: process.env.PORT
};