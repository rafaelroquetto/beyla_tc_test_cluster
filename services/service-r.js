const express = require('express');
const axios = require('axios');
const Redis = require('ioredis');

const app = express();
const redis = new Redis({
    host: 'redis',
    port: 6379
});

// Background worker to consume messages and call Service C
async function consumeRedisAndCallC() {
	/*
    while (true) {
        try {
            const result = await redis.brpop('service-channel', 0); // Blocking pop
            const message = result[1];
            console.log(`Service R received message from Redis: ${message}`);

            // Call Service C
            const response = await axios.get("http://service-c:5002/c");
            console.log(`Service R -> ${response.data}`);
        } catch (err) {
            console.error('Error in Service R:', err);
        }
    }
    */
}

// Start the background worker (this will run in a separate thread or event loop)
setImmediate(() => {
    consumeRedisAndCallC();
});

// Route to interact with Redis from service-b
app.get('/r', async (req, res) => {
    try {
        // Set a value in Redis for your test (this could be a trace, message, etc.)
        const value = 'some-test-value';
        await redis.set('test-key', value);

        // Optionally, you can add a message to a Redis list
        await redis.lpush('service-channel', 'Message from Service R');

        res.send(`Service R -> Redis set value: ${value}`);
    } catch (err) {
        console.error('Error in Service R:', err);
        res.status(500).send('Error interacting with Redis');
    }
});

app.listen(5006, () => console.log('Service R running on port 5006'));

