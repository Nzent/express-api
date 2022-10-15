import mongoose from "mongoose";
import config from "config";
import log from "../logger";

async function connect() {
  const dbUri = config.get("dbUri") as string;

  return await mongoose.connect(dbUri)
  .then(()=>{
    log.info("Database connected")
  })
  .catch((err)=>{
    log.info("Db error",err)
    process.exit(1)
  })
}

export default connect