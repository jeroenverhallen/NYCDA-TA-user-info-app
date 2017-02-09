const   express = require('express'),
        fs = require('fs'),
        router = express.Router();

var userStore = require('./../user-reader');

router.get('/', (request, response) => {
    response.render('search/search-users');
});

router.post('/', (request, response) => {
    response.redirect('/search/' + request.body.query);
});

router.get('/:query', (request, response) => {
    var results = userStore.searchUsers(request.params.query);

    response.render('search/show-results', {results: results});
});

module.exports = router;