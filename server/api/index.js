import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import { printSchema } from 'graphql/utilities/schemaPrinter';
import bodyParser from 'body-parser';

import initPostgres from './resources/postgresDB';
import initFirebase from './resources/firebase';
// import initJson from './resources/jsonServer';

import typeDefs from './schema';
import createLoaders from './loaders';
import createResolvers from './resolvers';

export default function (app) {
  const pgResources = initPostgres(app);
  const firebaseResources = initFirebase(app);
  // const jsonResources = initJson(app);
  
  const resolvers = createResolvers({
    // jsonResources,
    pgResources,
    firebaseResources,
  });

  const graphQLSchema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  app.use('/graphql', bodyParser.json(), graphqlExpress({
    schema: graphQLSchema,
    context: {
      loaders: createLoaders({
        // jsonResources,
        pgResources,
        firebaseResources,
      }),
    },
  }));

  app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql',
  }));

  app.use('/schema', (req, res) => {
    res.set('Content-Type', 'text/plain');
    res.send(printSchema(graphQLSchema));
  });
}
