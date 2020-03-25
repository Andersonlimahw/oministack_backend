const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();

// Define que o input é um json
app.use(cors({
    origin: '*'
}));
app.use(express.json());
app.use(routes);
app.listen(3333);
