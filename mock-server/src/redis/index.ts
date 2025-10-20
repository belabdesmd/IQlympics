import { createClient } from "redis";

const redisClient = createClient({
  username: 'default',
  password: 'eHmTD6zFChRV4le2C3FPhbmOkFrRIZkt',
  socket: {
    host: 'redis-14971.c270.us-east-1-3.ec2.redns.redis-cloud.com',
    port: 14971
  }
});

redisClient.on("error", (err) => {
  console.error("Redis Client Error:", err);
});

export async function initRedis() {
  if (!redisClient.isOpen) {
    await redisClient.connect();
    console.log("✅ Redis connected");
  }
}

export default redisClient;
