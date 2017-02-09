const   express = require('express'),
        fs = require('fs'),
        router = express.Router();

const userStore = require('./../user-reader');

router.get('/new', (request, response) => {
    response.render('users/new');
});

router.post('/', (request, response) => {
    console.log(5);
    userStore.addUser(request.body);
    response.redirect('/');
});


module.exports = router;