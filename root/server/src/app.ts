import express from "express";
import config from "config";
import connectToDB from "./utils/connectToDB";
import router from "./routes";
import log from "./utils/logger";
import deserializeUser from "./middleware/deserializeUser";

const app = express();
app.use(express.json());
app.use(deserializeUser)
app.use(router);

const port = config.get('port');

app.listen(port, () => {
  log.info(`App started at http://localhost:${port} 🚩`);
  connectToDB();
});
