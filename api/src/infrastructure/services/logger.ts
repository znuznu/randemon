import { config } from '../server/config';
import pino from 'pino';

// TODO create a Logger service

export const logger = pino({
    name: config.APP_NAME,
    level: config.LOG_LEVEL
});

export const loggerTest = pino({
    name: config.APP_NAME,
    level: config.LOG_LEVEL_TEST
});
