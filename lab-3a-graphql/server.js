const db = require('./app/config/db');
const express = require('./app/config/express');
const port = process.env.SENG365_PORT || 3000;
const {graphqlHTTP} = require('express-graphql')
const context = require('./app/graphql/context')
const {schema} = require('./app/graphql/schema')

const app = express();
app.use('/graphql', graphqlHTTP({
    context,
    schema,
}))

//Test Db connection
async function testDbConnection() {
    try {
        await db.connect();
        await db.getPool().getConnection();
    } catch (err) {
        console.error(`Unable to connect to mysql: ${err.message}`);
        process.exit(1)
    }
}

testDbConnection().then(function() {
    app.listen(port, function () {
        console.log(`listening on port ${port}`)
    })
})
