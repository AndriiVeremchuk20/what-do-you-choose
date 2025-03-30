import Redis from "ioredis";
import {env} from "~/env";

const {DB_REDIS_URL} = env;

const redis = new Redis(DB_REDIS_URL);

// test connection
redis
  .ping()
  .then(() => console.log("connections success"))
  .catch(() => console.log("connections failed"));

export default redis;
