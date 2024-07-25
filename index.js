const express = require('express');
const request = require('request');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Server Node');
});

app.post('/api/unlock-user', (req, res) => {
    const { EMAIL, USER } = req.body;

    var options = {
        method: 'POST',
        url: 'http://10.1.6.13:8002/sap/bc/rest/zrest/USER?sap-client=103',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic QVBJQ09OTkVDVDppVVd7aCR3c0xzeiVGZXMyRVh3cXs9cEJwS1pFcWJjZGtdLyt+VVRZ',
            'Cookie': 'SAP_SESSIONID_DEV_103=jgbb2HZ4XZmyw0I0ZfKwBlVF4jNKahHvrEgAUFawrYI%3d; sap-usercontext=sap-client=103'
        },
        body: JSON.stringify({
            "EMAIL": EMAIL,
            "USER": USER
        })
    };

    request(options, function (error, response) {
        if (error) {
            console.error(error);
            return res.status(500).send('Something went wrong!');
        }
        res.status(response.statusCode).send(response.body);
    });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
