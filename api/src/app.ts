import express, { Request, Response } from 'express';
import { graphqlHTTP } from 'express-graphql';
import cors from 'cors';

import { logger } from './logger';
import { buildRootResolver } from './core/graphql/rootResolver';
import schema from './core/graphql/schema';
import { config } from './config';
import { buildCoreServices, CoreServices } from './core/services/buildCoreServices';

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(
    cors({
        origin: config.CLIENT_URL
    })
);

app.get('/health', (_req: Request, res: Response) => {
    res.status(200).send('OK');
});

process.on('uncaughtException', (err) => {
    logger.error(`Uncaught Exception: ${err.message}`);
    process.exit(1);
});

process.on('unhandledRejection', (reason) => {
    logger.error(`Unhandled rejection at ${reason}`);
    process.exit(1);
});

const coreServices: CoreServices = buildCoreServices(config);
const rootResolver = buildRootResolver(coreServices);

app.use(
    '/queries',
    graphqlHTTP({
        schema,
        rootValue: rootResolver,
        graphiql: true,
        customFormatErrorFn: (error) => {
            logger.error(error.message);

            return {
                message: error.message
            };
        }
    })
);

app.listen(PORT, () => {
    logger.info(`API listening on port ${PORT}`);
});
