import express from "express";
import cors from "cors";
import "./config/mongoDB.js";
const app = express();
app.use(cors());

const PORT = 3322;

app.get('/database', async (req, res) => {
  res.send(200)
});


app.listen(PORT, () => {
  console.log(`Server is running faaaast on port ${PORT} 🏎️💨 `);
});
