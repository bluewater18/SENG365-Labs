const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('HTTP request: GET /');
});

app.post('/', (req, res) => {
    res.send('HTTP request: POST /');
});

app.put('/', (req, res) => {
    res.send('HTTP request: PUT /');
});

app.delete('/', (req, res) => {
    res.send('HTTP request: DELETE /');
});

app.all('/secret', function (req, res, next) {
    console.log('Accessing the secret section ...')
    next() // pass control to the next handler
})

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});