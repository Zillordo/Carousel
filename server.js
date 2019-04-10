const express = require('express');
const expressGql = require('express-graphql');

const schema = require('./graphql/schema');

const app = express();

app.use('/graphql', expressGql({
    schema: schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log('Server is running on port 4000 . . .');
});