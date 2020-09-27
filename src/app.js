const express = require('express');
const cors = require('cors');
const { errors } = require('celebrate');

const routes = require('./routes');

const app = express();

// Define que o input é um json
app.use(cors({
    origin: '*'
}));
app.use(express.json());
app.use(routes);
app.use(errors());

module.exports = app;
