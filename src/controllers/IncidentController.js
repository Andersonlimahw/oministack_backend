const connection = require('../database/connection');

module.exports = {
    async create(request, response) {
        // destructing pra registrar apenas valores desejados
        const { title, description, value } = request.body;
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
        const { page = 1} = request.query;

        const [count] = await connection('incidents').count();
        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select(['incidents.*',
                'ongs.name as ong_name', 
                'ongs.email as ong_email', 
                'ongs.whatsapp as ong_whatsapp', 
                'ongs.city as ong_city', 
                'ongs.uf as onguf'
            ]);

        response.header('X-Total-Count', count['count(*)']);
        return response.json(incidents);
    }, 
    async getById(request, response) {
        const { id } = request.params;
        const incident = await  connection('incidents')
            .select('*')
            .where('id',id)
            .first();
        return response.json(incident);
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
    },

    async deleteAll(request, response){
        console.log('#warning, removing all incidents');
        await connection('incidents').delete();
        return response.status(204).send();
    }
}