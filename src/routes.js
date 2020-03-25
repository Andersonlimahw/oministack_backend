const express = require('express');

const routes = express.Router();

routes.get('/users',(request, response) => {
    return response.json([{
        name: 'Anderson Lima', 
        site: 'andersonlima.com.br'
        }
  ]);
});

routes.get('/users/:id', (request, response) => {
    return response.json({
        id: 1,
        name: 'Anderson Lima', 
        site: 'andersonlima.com.br'
    });
});

routes.post('/users', (request, response) => {
    const body = request.body;
    return response.json({
        success: true
    });
});

routes.put('/users/:id', () => {
    return response.json({
        success: true, 
        message: `${request.params.id}, atualizado com sucesso!`
    });
});

module.exports = routes;