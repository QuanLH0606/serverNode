const express = require('express');
const bodyParser = require('body-parser');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const request = require('request');
const app = express();
const port = 3000;

// Swagger setup
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Express API with Swagger',
      version: '1.0.0',
      description: 'A simple API application made with Express and documented with Swagger',
    },
    servers: [
      {
        url: `http://localhost:${port}`,
      },
    ],
  },
  apis: ['./index.js'], // Specify your API docs file
};

const specs = swaggerJsdoc(options);
app.use(cors({
  origin: '*', // Hoặc chỉ định các miền cụ thể thay vì '*' để tăng cường bảo mật
}));
// Middleware
app.use(bodyParser.json()); // To parse JSON bodies
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(specs));

/**
 * @swagger
 * /:
 *   get:
 *     summary: Welcome message
 *     responses:
 *       200:
 *         description: Returns a welcome message
 */
app.get('/', (req, res) => {
    res.send('Server Node');
});

/**
 * @swagger
 * /api/unlock-user:
 *   post:
 *     summary: Unlock user by email and username
 *     requestBody:
 *       description: User information to unlock
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               EMAIL:
 *                 type: string
 *               USER:
 *                 type: string
 *     responses:
 *       200:
 *         description: Unlock user successfully
 *       500:
 *         description: Internal server error
 */
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
    console.log(`Server is running at http://localhost:${port}/swagger`);
});
