import { redis } from "../redis/redis.connection.js";
import base62 from 'base62';

const generateRedisKey = (messages) => {
    const jsonString = JSON.stringify(messages);  
    const buffer = Buffer.from(jsonString);       
    return base62.encode(buffer); 
};

const ai = async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ msg: "Invalid input. 'messages' should be a non-empty." });
        }

        const systemMessage = {
            role: "system",
            content: "You are a helpful assistant. Please respond in English only."
        };

        const userMessage = {
            role: "user",
            content: message
        };

        const updatedMessages = [systemMessage, userMessage];
        const redisKey = generateRedisKey(updatedMessages);
        console.log(redisKey)
        const dataRedis = await redis.get(redisKey);
        if (dataRedis) {
            // console.log("redis");
            return res.status(200).json({ response: dataRedis });
        }

        // console.log("Miss redis");

        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.AI_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "deepseek/deepseek-r1:free",
                messages: updatedMessages
            })
        });

        if (!response.ok) {
            throw new Error(`API responded with status ${response.status}`);
        }

        const data = await response.json();
        await redis.set(redisKey, data.choices[0].message.content);

        res.json({ response: data.choices[0].message.content });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: "Internal Server Error"});
    }
};

export { ai };
