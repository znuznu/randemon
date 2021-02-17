import pino from 'pino';
import getConfig from './config';

export const logger = pino({
    name: getConfig().APP_NAME,
    level: getConfig().LOG_LEVEL
});
