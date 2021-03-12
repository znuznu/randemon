interface Config {
    APP_NAME: string;
    LOG_LEVEL: 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal';
    API_URL: string;
}

const config: Config = {
    APP_NAME: 'randemon-api',
    LOG_LEVEL: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
    API_URL: 'https://pokeapi.co/api/v2/'
};

export { config };
