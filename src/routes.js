const express = require('express');
const crypto = require('crypto');

const connection = require('./database/connection');

const routes = express.Router();

routes.get('/ongs',(request, response) => {
    return response.json([{
        name: 'Anderson Lima', 
        site: 'andersonlima.com.br'
        }
  ]);
});

routes.get('/ongs/:id', (request, response) => {
    return response.json({
        id: 1,
        name: 'Anderson Lima', 
        site: 'andersonlima.com.br'
    });
});

routes.post('/ongs', async (request, response) => {
    const { name, email, whatsapp, city, uf } = request.body; // destructing pra registrar apenas valores desejados
    const id =  crypto.randomBytes(4).toString('HEX');

    await connection('ongs').insert({
        id, 
        name, 
        email, 
        whatsapp,
        city, 
        uf
    });

    return response.json({
        id: id,
        code: 200,
        message: `Ong salva com sucesso!`
    });
});

routes.put('/ongs/:id', () => {
    return response.json({
        success: true, 
        message: `${request.params.id}, atualizado com sucesso!`
    });
});

module.exports = routes;