interface Config {
    APP_NAME: string;
    LOG_LEVEL: 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal';
    API_URL: string;
    REDIS_HOST: string;
    REDIS_HOST_TEST: string;
    REDIS_PORT: number;
    REDIS_PORT_TEST: number;
}

const config: Config = {
    APP_NAME: 'randemon-api',
    LOG_LEVEL: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
    API_URL: 'https://pokeapi.co/api/v2/',
    REDIS_HOST: process.env.REDIS_HOST ?? 'localhost',
    REDIS_PORT: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT!) : 6379,
    REDIS_HOST_TEST: process.env.REDIS_HOST_TEST ?? 'localhost',
    REDIS_PORT_TEST: process.env.REDIS_PORT_TEST
        ? parseInt(process.env.REDIS_PORT_TEST!)
        : 7777
};

export { config };
