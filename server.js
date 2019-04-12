const express = require('express');
const expressGql = require('express-graphql');
const cors = require('cors');

const schema = require('./graphql/schema');

const app = express();

app.use(cors())

app.use('/graphql', expressGql({
    schema: schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log('Server is running on port 4000 . . .');
});