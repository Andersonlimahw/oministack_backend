const request = require('supertest');
const app =  require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {

    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll(async () => {
        await connection.destroy();
    });

    // it('should be able to create a new ONG', async () => {
    //     const response = await request(app)
    //     .post('/ongs')
    //     .send({
    //         name: 'Lima fondations', 
    //         email: 'contact@limafoundation.com', 
    //         whatsapp: '11948484848', 
    //         uf: 'SP', 
    //         city: 'São Paulo'
    //     });
    //     expect(response.body).toHaveProperty('id');
    //     expect(response.status).toBe(200);
    // });

    // it('should be unable to create a new ONG with invalid payload', async () => {
    //     const response = await request(app)
    //     .post('/ongs')
    //     .send({
    //         name: 'Lima fondations', 
    //         email: 'contact', 
    //         whatsapp: '948484848', 
    //         uf: 'SP', 
    //         city: 'São Paulo'
    //     });
       
    //     expect(response.status).toBe(400);
    // });
});