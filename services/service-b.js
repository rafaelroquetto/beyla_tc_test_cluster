const express = require('express');
const axios = require('axios');

const app = express();

app.get('/b', async (req, res) => {
    try {
        // Making all requests in parallel using Promise.all
        const serviceCRequest = await axios.get('http://service-c:5002/c');
        const serviceRRequest = await axios.get('http://service-r:5006/r');
        const serviceQRequest = await axios.post(
            'http://service-q:5007/q',
            {
                query: '{ hello }'  // GraphQL query as JSON payload
            },
            {
                headers: { 'Content-Type': 'application/json' }
            }
        );

        // Wait for all requests to finish
        const [serviceCResponse, serviceRResponse, serviceQResponse] = await Promise.all([serviceCRequest, serviceRRequest, serviceQRequest]);

        // Combine results
        res.send(`
            Service B -> Service C -> ${serviceCResponse.data} <br>
            Service B -> Service R -> ${serviceRResponse.data} <br>
            Service B -> Service Q -> ${JSON.stringify(serviceQResponse.data)}
        `);
    } catch (error) {
        console.error('Error in Service B:', error.message);
        res.status(500).send('Service B encountered an error');
    }
});

app.listen(5001, () => console.log('Service B running on port 5001'));

