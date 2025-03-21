const express = require('express');
const axios = require('axios');

const app = express();

app.get('/b', async (req, res) => {
    const response = await axios.get("http://service-c:5002/c");
    res.send(`Service B -> ${response.data}`);
});

app.listen(5001, () => console.log('Service B running on port 5001'));


