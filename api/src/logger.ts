import { config } from './config';
import pino from 'pino';

export const logger = pino({
    name: config.APP_NAME,
    level: config.LOG_LEVEL
});
