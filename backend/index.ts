import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
const app = express();
const users = require('./routes/users');
const mail = require('./mailing');

app.use(cors());
app.use(express.json());
app.use('/users', users);
require('dotenv').config();

interface Config {
  host: String;
  port: String | Number;
  apiPort: String | Number;
  database: String;
}

const apiConnData: Config = {
  host: process.env.HOST || '127.0.0.1',
  port: process.env.DATABASE_PORT || 27017,
  apiPort: process.env.API_PORT || 5432,
  database: process.env.DATABASE || 'auction_service',
};

mongoose
  .connect(
    `mongodb://${apiConnData.host}:${apiConnData.port}/${apiConnData.database}`
  )
  .then((response) => {
    console.log(
      `Connected to MongoDB. Database name: "${response.connections[0].name}"`
    );
    app.listen(apiConnData.apiPort, () => {
      console.log(
        `API server listening at http://localhost:${apiConnData.apiPort}`
      );
    });
  })
  .catch((error) => console.error('Error connecting to MongoDB', error));
