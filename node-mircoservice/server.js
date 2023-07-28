import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import { connect } from 'mongoose';
import { MongoClient } from 'mongodb';
import cors from 'cors';
import PatientService from './service/patient/PatientService.js';

dotenv.config();

const server = express();
const port = process.env.PORT || 8000;

server.use(helmet());

server.use(bodyParser.urlencoded({ extended: false }));
server.use(cors());

server.use(bodyParser.json());

server.get('/patients', async (req, res) => {
  const patients = await PatientService.get();
  res.send({ patients });
});

const setupMongo = async () => {
  const uri = 'mongodb://mongo-database:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.10.1';

  const client = new MongoClient(uri);

  try {
    // Connect to the MongoDB cluster
    await client.connect("patients");
    await connect(uri);

    const collection = await PatientService.get();
    if (!collection || !collection.length) {
      PatientService.init();
    }

  } catch (e) {
    console.error(e);
  }
};

server.listen(port, () => {
  setupMongo();
  console.log(`[Server]: I am running at http://localhost:${port}`);
});
