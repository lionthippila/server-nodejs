const express = require('express');
const app = express();
const PORT = 3000;

// Endpoint to get players data from both URLs
app.get('/players', async (req, res) => {
    const urls = [
        'http://89.38.101.78:30120/players.json', // Sakura Town
        'http://103.167.193.79:30120/players.json', // Highest Town
        'http://athenatown.myddns.me:30120/players.json', // Athena Town

        //TRAINING
        'http://103.91.190.189:30120/players.json',
        'http://103.91.190.68:30120/players.json',
        'http://103.208.27.132:30120/players.json',
        'http://103.91.190.230:30120/players.json',
        'http://103.208.27.17:30120/players.json',
        'http://103.208.27.176:30120/players.json',
        'http://103.91.190.164:30120/players.json',
        'http://103.91.190.171:30120/players.json',
    ];

    try {
        // Dynamically import node-fetch
        const fetch = await import('node-fetch').then(mod => mod.default);
        
        // Fetch data from both URLs concurrently
        const responses = await Promise.all(urls.map(url => fetch(url)));
        
        // Check if all responses are ok
        responses.forEach(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
        });
        
        // Parse the JSON data from all responses
        const dataPromises = responses.map(response => response.json());
        const data = await Promise.all(dataPromises);
        
        // Extract counts and combined data
        const dataFromFirstSource = data[0];
        const dataFromSecondSource = data[1];
        const dataFromThirdSource  = data[2];
        const dataFromFourSource  = data[3];
        const dataFromFiveSource  = data[4];
        const dataFromSixSource  = data[5];
        const dataFromSenvenSource  = data[6];
        const dataFromEightSource  = data[7];
        const dataFromNineSource  = data[8];
        const dataFromTenSource  = data[9];
        const dataFromElevenSource = data[10];

        const combinedData = dataFromFirstSource.concat(dataFromSecondSource);
        
        // Create response object with counts and combined data
        const responseObject = {
            source1Count: dataFromFirstSource.length,
            source2Count: dataFromSecondSource.length,
            source3Count: dataFromThirdSource.length,
            source4Count: dataFromFourSource.length,
            source5Count: dataFromFiveSource.length,
            source6Count: dataFromSixSource.length,
            source7Count: dataFromSenvenSource.length,
            source8Count: dataFromEightSource.length,
            source9Count: dataFromNineSource.length,
            source10Count: dataFromTenSource.length,
            source11Count: dataFromElevenSource.length,

            totalPlayers: combinedData.length,
            players: combinedData
        };
        
        // Set CORS header to allow access from any origin
        res.setHeader('Access-Control-Allow-Origin', '*');
        
        // Send the response object as the response
        res.json(responseObject);
    } catch (error) {
        console.error(`Error fetching data: ${error.message}`);
        // Send a 500 error response with the error message
        res.status(500).send(`Error retrieving data: ${error.message}`);
    }
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Proxy server running at http://localhost:${PORT}`);
});
