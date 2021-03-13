import express, { Request, Response } from 'express';
import { graphqlHTTP } from 'express-graphql';

import { logger } from './logger';
import rootResolver from './graphql/rootResolver';
import schema from './graphql/schema';

const app = express();
const PORT = Number(process.env.API_PORT) || 3000;

app.get('/health', (_req: Request, res: Response) => {
    res.status(200).send('OK');
});

process.on('uncaughtException', (err) => {
    console.log(`Uncaught Exception: ${err.message}`);
    process.exit(1);
});

process.on('uncaughtException', (err) => {
    console.log(`Uncaught Exception: ${err.message}`);
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    console.log('Unhandled rejection at ', promise);
    process.exit(1);
});

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
