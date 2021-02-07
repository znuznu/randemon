import express, { Request, Response } from 'express';
import { graphqlHTTP } from 'express-graphql';

import schema from './graphql/schema';
import rootResolver from './graphql/rootResolver';

const app = express();
const PORT = Number(process.env.API_PORT) || 3000;

app.get('/health', (req: Request, res: Response) => {
    res.status(200).send('OK');
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
    console.log(`API listening on port ${PORT}`);
});
