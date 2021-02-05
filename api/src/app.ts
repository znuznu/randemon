import express from 'express';
import { graphqlHTTP } from 'express-graphql';

import schema from './graphql/schema';
import rootResolver from './graphql/rootResolver';

const app = express();
const port = 3000;

app.use(
    '/graphql',
    graphqlHTTP({
        schema,
        rootValue: rootResolver,
        graphiql: true
    })
);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
