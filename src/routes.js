const express = require('express');
const  OngController = require('./controllers/OngController');
const IncidentsController = require('./controllers/IncidentController');

const ProfileController = require('./controllers/ProfileController');

const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.post('/sessions', SessionController.create);

routes.get('/ongs', OngController.index);

routes.get('/ongs/:id', OngController.getById);

routes.post('/ongs', OngController.create);

routes.get('/incidents', IncidentsController.index);

routes.get('/incidents/:id', IncidentsController.getById);

routes.post('/incidents', IncidentsController.create);

routes.delete('/incidents/:id', IncidentsController.delete);

routes.get('/profile', ProfileController.index);

module.exports = routes;