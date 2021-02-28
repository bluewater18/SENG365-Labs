const express = require('express');
const app = express();
const data = require('./users.json');
const users = data.users;
console.log(users)
// Import should be at the top of the file
const bodyParser = require('body-parser');
// Tell the express app to expect json in the body of the request
app.use(bodyParser.json());

app.get('/users', (req, res) => {
    res.status(200).send(users)
});

app.get('/users/:id', (req, res) => {
    const id = req.params.id;
    let response = `No user with id ${id}`;
    for (const user of users) {
        if (parseInt(id) === user.id) {
            response = user;
            break;
        }
    }
    res.status(200)
        .send(response);
});

app.post('/users', (req, res) => {
    const newUser = req.body;
    users.push(newUser);
    res.status(201) // POST requests should return 201 if they create something
        .send(users);
});

app.put('/users/:id', (req, res) => {
    const id = req.params.id;
    const updatedUser = req.body;
    for (const user of users) {
        if (parseInt(id) === user.id) {
            const index = users.indexOf(user);
            users[index] = updatedUser;
            break;
        }
    }
    res.status(200)
        .send(updatedUser);
});

app.delete('/users/:id', (req, res) => {
    const id = req.params.id;
    for (const user of users) {
        if (parseInt(id) === user.id) {
            const index = users.indexOf(user);
            users.splice(index, 1); // Remove 1 user from the array at this index
        }
    }
    res.send(users);
});

app.get('/users/:id/following', (req, res) => {
    const id = req.params.id;
    for (const user of users) {
        if (parseInt(id) === user.id) {
            response = user.following
            break
        }
    }
    res.status(200)
        .send(response);
})

app.post('/users/:id/following/:followId', (req, res) => {
    const id = req.params.id;
    const followId = req.params.followId
    for (const user of users) {
        if (parseInt(id) === user.id) {
            user.following.push(parseInt(followId))
            res.status(200)
                .send('OK');
            return
        }
    }
    res.status(400).send('error')

})

app.delete('/users/:id/following/:followId', (req, res) => {
    const id = req.params.id;
    const followId = req.params.followId
    for (const user of users) {
        if (parseInt(id) === user.id) {
            index = user.following.indexOf(parseInt(followId))
            user.following.splice(index, 1)
            res.status(200)
                .send('OK');
            return
        }
    }
    res.status(400).send('error')

})

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});