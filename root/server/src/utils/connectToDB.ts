import mongoose from "mongoose";
import config from "config";
import log from "./logger";

const connectToDB = async () => {

  const dbURI = config.get<string>('dbURI');
  try {

    await mongoose.connect(dbURI);
    log.info('successfully connected to DB ✅');

  } catch (err: any) {
    process.exit(1);
  }

};

export default connectToDB;
