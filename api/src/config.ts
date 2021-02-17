interface Config {
    APP_NAME: string;
    LOG_LEVEL: 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal';
    API_URL: string;
}

export default function getConfig(): Config {
    return {
        APP_NAME: 'randemon-api',
        LOG_LEVEL: 'debug',
        API_URL: 'https://pokeapi.co/api/v2/'
    };
}
