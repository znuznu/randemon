import IORedis from 'ioredis';
import { Logger } from 'pino';

class CacheService {
    private cacheClient: IORedis.Redis;
    private logger: Logger;

    constructor(cacheClient: IORedis.Redis, logger: Logger) {
        this.cacheClient = cacheClient;
        this.logger = logger;
    }

    async set(key: string, value: string): Promise<void> {
        this.logger.info(`[CACHE] set key: '${key}'`);
        this.cacheClient.set(key, value);
    }

    async get(key: string): Promise<string | null> {
        return this.cacheClient.get(key).then((result: string | null) => {
            if (!result) {
                this.logger.info(`[CACHE] '${key}' not found in cache`);
            }

            return result;
        });
    }

    async connect(): Promise<void> {
        await this.cacheClient.connect();
        this.logger.info('Connected to Redis');
    }

    async disconnect(): Promise<void> {
        await this.cacheClient.quit();
        this.logger.info('Disconnected from Redis');
    }

    async clear(): Promise<void> {
        this.logger.info('Cache cleared');
        await this.cacheClient.flushall();
    }

    static createRedisClient({ host, port }: RedisConfig): IORedis.Redis {
        return new IORedis({
            host,
            port,
            lazyConnect: true
        });
    }
}

export interface RedisConfig {
    host: string;
    port: number;
    reconnectingRetryAttempts?: number;
}

export default CacheService;
