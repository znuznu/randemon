import { Logger } from 'pino';
import { CacheService } from './cache.interface';

// Not really a fake one, but an in-memory cache service for unit testing
export default class FakeCacheService implements CacheService {
    private logger: Logger;
    private cache: Map<string, string> = new Map();

    constructor(logger: Logger) {
        this.logger = logger;
    }

    async set(key: string, value: string): Promise<void> {
        this.logger.info(`[CACHE] set key: '${key}'`);
        this.cache.set(key, value);
    }

    async get(key: string): Promise<string | null> {
        const result = this.cache.get(key);

        if (result) {
            return result;
        } else {
            this.logger.info(`[CACHE] '${key}' not found in cache`);

            return null;
        }
    }

    async connect(): Promise<void> {
        this.logger.info('Connected to Redis');
        return;
    }

    async disconnect(): Promise<void> {
        this.logger.info('Disconnected from Redis');
        return;
    }

    async clear(): Promise<void> {
        this.logger.info('Cache cleared');
        this.cache.clear();
    }
}
