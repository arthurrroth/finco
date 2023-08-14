import { MongoClient } from "mongodb";
import dotenv from 'dotenv';

dotenv.config();
// Replace the following with values for your environment.
const username = encodeURIComponent('dbAdmin');
const password = encodeURIComponent('SmNbaV1qYWZ1');
const clusterUrl = 'finco.atlizpm.mongodb.net';

const authMechanism = "DEFAULT";

const uri =
  `mongodb+srv://${username}:${password}@${clusterUrl}/?authMechanism=${authMechanism}`;

// Create a new MongoClient
const client = new MongoClient(uri);

// Function to connect to the server
async function runDB() {
  try {
    // Establish and verify connection
    await client.db("dbAdmin").command({ ping: 1 });
    console.log("Connected successfully to server");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
runDB().catch(console.dir);
