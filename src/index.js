const express = require('express');
const routes = require('./routes');

const app = express();

// Define que o input é um json
app.use(express.json());
app.use(routes);
app.listen(3333);
