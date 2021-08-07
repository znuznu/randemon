import { Config } from '../server/config';
import { logger } from './logger';
import { CacheService } from '../../domain/ports/cache.service';
import RedisCacheService from './cache/redisCache.service';
import AxiosAdapter from '../http/adapters/axiosAdapter';
import { createHttpService } from '../../domain/ports/http/createHttpService';
import { HttpService } from '../../domain/ports/http/http.service';

export function buildInfrastructureServices(config: Config): InfrastructureServices {
    const httpService = createHttpService(new AxiosAdapter());
    const cacheService = new RedisCacheService(
        config.REDIS_URL
            ? RedisCacheService.createRedisClientFromURL(config.REDIS_URL)
            : RedisCacheService.createRedisClient({
                host: config.REDIS_HOST,
                port: config.REDIS_PORT
            }),
        logger
    );

    return { httpService, cacheService };
}

export interface InfrastructureServices {
    httpService: HttpService;
    cacheService: CacheService;
}
