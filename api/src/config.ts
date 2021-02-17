interface Config {
    APP_NAME: string;
    LOG_LEVEL: 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal';
}

export default function getConfig(): Config {
    return {
        APP_NAME: 'randemon-api',
        LOG_LEVEL: 'debug'
    };
}
