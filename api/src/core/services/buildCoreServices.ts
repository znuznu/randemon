import { Config } from '../../config';
import { logger } from '../../logger';
import { CacheService } from '../cache/cache.interface';
import RedisCacheService from '../cache/redisCache.service';
import AxiosAdapter from '../http/adapters/axiosAdapter';
import { createHttpService, HttpService } from '../http/http';

export function buildCoreServices(config: Config): CoreServices {
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

export interface CoreServices {
    httpService: HttpService;
    cacheService: CacheService;
}
