const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('../resolvers');
const TrackAPI = require('../datasources/track-api');

async function startApolloServer(typeDefs, resolvers) {
    const server = new ApolloServer({
        typeDefs, resolvers,
        dataSources: () => {
            return { trackAPI: new TrackAPI() }
        }
    });

    const { url, port } = server.listen();
    console.log(`
        🚀  Server is running!
        🔉  Listening on port 4000
        📭  Query at https://studio.apollographql.com/dev
        `);
};

startApolloServer(typeDefs, resolvers);
