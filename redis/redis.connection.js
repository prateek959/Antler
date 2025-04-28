import Redis from "ioredis";
import "dotenv/config";

const redis = new Redis({
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST,
    username: "default",
    password: process.env.REDIS_PASS,
    db: 0,
});


export { redis };
