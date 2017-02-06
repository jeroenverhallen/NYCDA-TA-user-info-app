var   express = require('express'),
      bodyParser = require('body-parser'),
      searchRoutes = require('./routes/search'),
      pug = require('pug');

var   app = express(),
      userStore = require('./user-reader');

app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({ extended:false}));

app.use('/search', searchRoutes);

app.get('/', (request, response) => {
  response.render('index', { users: userStore.getUsers() });
});

app.listen(3000, () => {
  console.log('Web Server is running on port 3000');
});