const express = require('express'),
      morgan = require('morgan'),
      bodyParser = require('body-parser'),
      pug = require('pug'),
      fs = require('fs');

const userRoutes = require('./routes/users'),
      searchRoutes = require('./routes/search'),
      addRoutes = require('./routes/add-user');

const app = express(),
      userStore = require('./user-reader');

var likeStore = JSON.parse(fs.readFileSync('likes.json'));

var dislikeStore = JSON.parse(fs.readFileSync('dislikes.json'));

app.use(express.static('public'));

app.set('view engine', 'pug');

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/users', userRoutes);

app.use('/search', searchRoutes);

app.use('/add-user', addRoutes);

app.get('/', (request, response) => {
  response.render('index', { users: userStore.getUsers() });
});

app.get('/api/search/*', (req, res) => {
      var results = userStore.searchUsers(req.params[0]);
      res.json(results);
});

app.post('/like',(request, response) => {
      likeStore.likeCount = likeStore.likeCount + 1;
      response.json(likeStore);
      fs.writeFile('likes.json', JSON.stringify(likeStore), (error, data) => {
            if (error) {
                  throw error;
            }
            console.log('new likeCount added to likes.json');
      });
});

app.post('/dislike',(request, response) => {
      dislikeStore.dislikeCount = dislikeStore.dislikeCount + 1;
      response.json(dislikeStore);
      fs.writeFile('dislikes.json', JSON.stringify(dislikeStore), (error, data) => {
            if (error) {
                  throw error;
            }
            console.log('new dislikeCount added to dislikes.json');
      });
});

app.listen(3000, () => {
  console.log('Web Server is running on port 3000');
});