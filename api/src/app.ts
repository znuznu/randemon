import express from 'express';
import { graphqlHTTP } from 'express-graphql';

import schema from './graphql/schema';
import rootResolver from './graphql/rootResolver';

const app = express();
const PORT = process.env.API_PORT || 3000;

process.on('uncaughtException', err => {
    console.log(`[Uncaught Exception]: ${err.message}`)
    process.exit(1)
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
