const kenex = require('knex');

const configuration  = require('../../knexfile');
const config =  process.env.NODE_ENV === 'test' ? 
configuration.test : configuration.development;

const connection = kenex(config);

module.exports = connection;