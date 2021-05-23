import IORedis from 'ioredis';
import { Logger } from 'pino';
import { CacheService } from './cache.interface';

class RedisService implements CacheService {
    private client: IORedis.Redis;
    private logger: Logger;

    constructor(client: IORedis.Redis, logger: Logger) {
        this.client = client;
        this.logger = logger;
    }

    async set(key: string, value: string): Promise<void> {
        this.logger.info(`[CACHE] set key: '${key}'`);
        this.client.set(key, value);
    }

    async get(key: string): Promise<string | null> {
        return this.client.get(key).then((result: string | null) => {
            if (!result) {
                this.logger.info(`[CACHE] '${key}' not found in cache`);
            }

            return result;
        });
    }

    async connect(): Promise<void> {
        await this.client.connect();
        this.logger.info('Connected to Redis');
    }

    async disconnect(): Promise<void> {
        await this.client.quit();
        this.logger.info('Disconnected from Redis');
    }

    async clear(): Promise<void> {
        this.logger.info('Cache cleared');
        await this.client.flushall();
    }

    static createRedisClient({ host, port }: RedisConfig): IORedis.Redis {
        return new IORedis({
            host,
            port,
            lazyConnect: true
        });
    }

    static createRedisClientFromURL(url: string): IORedis.Redis {
        return new IORedis(url);
    }
}

export interface RedisConfig {
    host: string;
    port: number;
    reconnectingRetryAttempts?: number;
}

export default RedisService;
