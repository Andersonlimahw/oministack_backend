const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
    async create(request, response) {
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
    }, 
    async index(request, response) {
        const ongs = await connection('ongs').select('*');
        return response.json(ongs);
    }, 
    async getById(request, response) {
        const { id } = request.params;
        const ong = await  connection('ongs')
            .select('*')
            .where('id', id)
            .first();
        return response.json(ong);
    }
}