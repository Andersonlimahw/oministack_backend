const connection = require('../database/connection');

module.exports = {
    async create(request, response) {
        // ong_id, será obtido via id
        const { title, description, value } = request.body; // destructing pra registrar apenas valores desejados
        const ong_id = request.headers.authorization;
        const [id] = await connection('incidents').insert({
            title, 
            description, 
            value, 
            ong_id
        });
    
        return response.json({
            id: id,
            code: 200,
            message: `Incidente salvo com sucesso para a ong ${ong_id}!`
        });
    }, 
    async index(request, response) {
        const ongs = await connection('incidents').select('*');
        return response.json(ongs);
    }, 
    async getById(request, response) {
        const { id } = request.params;
        const ongById = await  connection('incidents').select('*').where('id',id);
        return response.json(ongById[0]);
    },
    async delete(request, response) {
        const { id } = request.params;
        const ong_id = request.headers.authorization;
        const incident = await  connection('incidents')
            .select('ong_id')
            .where(x => x.id === id)
            .first();
        if(ong_id !== incident.ong_id) {
            return response.status(403).json({ error: 'Operation not permited.'});
        }
        await connection('incidents').where('id', id).delete();
        return response.status(204).send();
    }
}