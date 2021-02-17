import express, { Request, Response } from 'express';
import { graphqlHTTP } from 'express-graphql';

import schema from './graphql/schema';
import rootResolver from './graphql/rootResolver';
import { logger } from './logger';

const app = express();
const PORT = Number(process.env.API_PORT) || 3000;

app.get('/health', (req: Request, res: Response) => {
    res.status(200).send('OK');
});

process.on('uncaughtException', (err) => {
    console.log(`Uncaught Exception: ${err.message}`);
    process.exit(1);
});

app.use(
    '/graphql',
    graphqlHTTP({
        schema,
        rootValue: rootResolver,
        graphiql: true
    })
);

app.listen(PORT, () => {
    logger.info(`API listening on port ${PORT}`);
});
