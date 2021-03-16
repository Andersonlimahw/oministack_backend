const connection = require('../database/connection');
const redis = require('../database/redis');

const getOnRedis = async (id) => {
    const incident = await redis.getFromCache(`heroapp:incident:${id}:cache`)
        .then((data) => {
            console.log('getOnRedis incident => ', data);
            return data;
        });

    if (incident) {
        console.log('getOnRedis incident if => ', incident);
        return incident;
    }
    return null;
};

const setOnRedis = async (id, value) => {
    const result = await redis.setCache(`heroapp:incident:${id}:cache`, `${value}`);
    return result;
};

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
        const { page = 1 } = request.query;

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
    async getByIdV1(request, response) {
        const { id } = request.params;
        const incident = await connection('incidents')
            .select('*')
            .where('id', id)
            .first();
        return response.json(incident);
    },
    async getById(request, response) {
        // Get with cache
        console.time("[IncidentController].getById")
        const { id } = request.params;
        let cacheResult = null;
        await redis.getFromCacheAsync(`heroapp:incident:${id}:cache`)
            .then(data => {
                    cacheResult = data;
                }
            );

        if (!cacheResult) {
            const incident = await connection('incidents')
                .select('*')
                .where('id', id)
                .first();

            await redis.setCacheAsync(`heroapp:incident:${id}:cache`, `${JSON.stringify(incident)}`);
            console.log('Valor não encontrado no cache, retornando do banco.', incident);
            console.timeEnd("[IncidentController].getById");
            return response.json(incident);

        } else {
            console.log('Valor retornado do cache, result => ', cacheResult);
            console.timeEnd("[IncidentController].getById");
            return response.json(cacheResult);
        }
        

    },
    async delete(request, response) {
        const { id } = request.params;
        const ong_id = request.headers.authorization;
        const incident = await connection('incidents')
            .select('ong_id')
            .where(x => x.id === id)
            .first();
        if (ong_id !== incident.ong_id) {
            return response.status(403).json({ error: 'Operation not permited.' });
        }
        await connection('incidents').where('id', id).delete();
        return response.status(204).send();
    },




}