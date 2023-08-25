import express from "express";
import config from "config";
import connectToDB from "./utils/connectToDB";
import router from "./routes";
import log from "./utils/logger";
import deserializeUser from "./middleware/deserializeUser";
import path from "path";
import cors from "cors";

const port = config.get('port');
const ReactAppDistPath = path.join(path.resolve(), "..", "client", "dist");
const ReactAppIndexPath = path.join(ReactAppDistPath, "index.html");
const app = express();

app.use(cors());
app.use(express.json());
app.use(deserializeUser)
app.use(router);
app.use(express.static(ReactAppDistPath));

app.get("/*", (_, res) => {
  res.sendFile(ReactAppIndexPath);
});

app.listen(port, () => {
  log.info(`App started at http://localhost:${port} 🚩`);
  connectToDB();
});
