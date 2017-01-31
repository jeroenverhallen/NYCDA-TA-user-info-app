var express = require('express'),
      pug = require('pug'),
      app = express(),
      userStore = require('./user-reader');

app.set('view engine', 'pug');

app.get('/', (request, response) => {
  response.render('index', { users: userStore.getUsers() });
});

app.listen(3000, () => {
  console.log('Web Server is running on port 3000');
});