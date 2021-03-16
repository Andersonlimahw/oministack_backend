//Config
const redis = require('redis');
const { promisify } = require("util");

// client.on("error", (error) => {
//     console.error(error);
// });


module.exports = {
    async setCacheAsync(key, value) {
        try {
            const client = redis.createClient(
                port = 6379
             );
             const result = await client.set(key, value);
             console.log(`[Redis].set() => received Key: ${key}, value: ${value}, Result: ${result}`);
             return result;
        } catch(err) {
            console.error(`[Redis].set() => received Key: ${key}, value: ${value}, Error: ${err}`); 
        }
        
    },
    async getFromCacheAsync(key) {
        try {
            const client = redis.createClient(
                port = 6379
            );
            const getAsync = promisify(client.get).bind(client); 
            return getAsync(key).then(data => JSON.parse(data)).catch(console.error);
        } catch (err){

            console.error(`[Redis].getFromCacheAsync() => received Key: ${key}, Err => ${err}`);
        }    
    }
}