import pino from 'pino';
import { config } from './config';

export const logger = pino({
    name: config.APP_NAME,
    level: config.LOG_LEVEL
});
