import { Logger } from 'pino';
import { CacheService } from '../../../domain/ports/cache.service';

export default class InMemoryCacheService implements CacheService {
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
        return;
    }

    async disconnect(): Promise<void> {
        return;
    }

    async clear(): Promise<void> {
        this.logger.info('Cache cleared');
        this.cache.clear();
    }
}
