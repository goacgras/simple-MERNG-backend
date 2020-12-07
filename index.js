const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers/index');

const server = new ApolloServer({
    typeDefs,
    resolvers
});

mongoose
    .connect(
        `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@gras-clusters.dh5gg.gcp.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
        { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => {
        console.log('MongoDB Connected');
        return server.listen({ port: 5000 });
    })
    .then((res) => {
        console.log(`Server is running at ${res.url}`);
    })
    .catch((err) => {
        console.log(err);
    });
