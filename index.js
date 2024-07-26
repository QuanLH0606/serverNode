const express = require('express');
const cors = require('cors'); // Thay 'request' bằng 'require'
const request = require('request'); // Giữ 'require' cho 'request'
const axios = require('axios');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
    res.send('Server Node');
});

app.post('/api/unlock-user', (req, res) => {
    const { EMAIL, USER } = req.body;
    let data = JSON.stringify({
      "EMAIL": EMAIL,
      "USER": USER
    });
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://10.1.6.13:8002/sap/bc/rest/zrest/USER?sap-client=103',
      headers: { 
        'Content-Type': 'application/json', 
        'Authorization': 'Basic QVBJQ09OTkVDVDppVVd7aCR3c0xzeiVGZXMyRVh3aXs9cEJwS1pFcWJjZGtdLyt+VVRZ', 
        'Cookie': 'SAP_SESSIONID_DEV_103=gNUb5JXdUwePHooWGJWg5XsAUNtK-hHviTMAUFawrYI%3d; sap-usercontext=sap-client=103'
      },
      data : data
    };

    axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
