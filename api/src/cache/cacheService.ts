import { Logger } from 'pino';
import redis, { RedisClient, RedisError } from 'redis';
import { promisify } from 'util';

class CacheService {
    public client: RedisClient;
    private logger: Logger;
    public _getAsync: any;

    constructor(logger: Logger, port: number = 6379) {
        this.client = redis.createClient({
            host: process.env.REDIS_SERVICE || 'localhost',
            port
        });

        this.client.on('error', function (error: RedisError) {
            console.error(error);
        });

        this._getAsync = promisify(this.client.get).bind(this.client);
        this.logger = logger;
    }

    public async getAsync(key: string): Promise<string | null> {
        return this._getAsync(key).then((result: string | null) => {
            if (result) {
                this.logger.info(`[CACHE] '${key}' already in cache`);
            } else {
                this.logger.info(`[CACHE] '${key}' not found in cache`);
            }

            return result;
        });
    }
}

export default CacheService;
