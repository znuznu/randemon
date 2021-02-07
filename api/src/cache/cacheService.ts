import redis, { RedisClient, RedisError } from 'redis';
import { promisify } from 'util';

class CacheService {
    public client: RedisClient;
    public _getAsync: any;

    constructor(port: number = 6379) {
        this.client = redis.createClient({
            host: process.env.REDIS_SERVICE || 'localhost',
            port
        });

        this.client.on('error', function (error: RedisError) {
            console.error(error);
        });

        this._getAsync = promisify(this.client.get).bind(this.client);
    }

    public async getAsync(key: string): Promise<string | null> {
        return this._getAsync(key).then((result: string | null) => {
            if (result) {
                console.log(`[CACHE] '${key}' already in cache`);
            } else {
                console.log(`[CACHE] '${key}' not found in cache`);
            }

            return result;
        });
    }
}

export default CacheService;
