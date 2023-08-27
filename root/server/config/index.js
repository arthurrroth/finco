import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.join(path.resolve(), "..", ".env"),
});

mongoose.connect(process.env.DB);
