import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();


const username = process.env.DB_USER;
const password = process.env.DB_PASS;
const clusterUrl = 'finco.atlizpm.mongodb.net';

const authMechanism = 'DEFAULT';

const uri = `mongodb+srv://${username}:${password}@finco.atlizpm.mongodb.net`;
const client = new MongoClient(uri);

export async function runDB() {
  try {
    // Establish and verify connection
    await client.db("abAdmin").command({ ping: 1 });
    console.log("Connected successfully to server");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
};
