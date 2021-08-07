import express, { Request, Response } from 'express';
import { graphqlHTTP } from 'express-graphql';
import cors from 'cors';

import { logger } from './infrastructure/services/logger';
import { buildRootResolver } from './application/graphql/rootResolver';
import schema from './application/graphql/schema';
import { config } from './infrastructure/server/config';
import { buildInfrastructureServices, InfrastructureServices } from './infrastructure/services/buildInfrastructureServices';

// Note: Could have move every express related stuff in infrastructure/ but the project is small

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

const coreServices: InfrastructureServices = buildInfrastructureServices(config);
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
