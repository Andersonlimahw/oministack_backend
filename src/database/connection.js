const kenex = require('knex');

const configuration  = require('../../knexfile');
const connection = kenex(configuration.development);

module.exports = connection;