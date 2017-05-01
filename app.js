const express = require('express');
var app = express();
const models = require('./models')

const bodyParser = require('body-parser');

const nunjucks = require('nunjucks');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

var routes = require('./routes');

app.use('/', routes);
app.use('/', routes);

app.set('view engine', 'html');
app.engine('html', nunjucks.render);

app.use(express.static(__dirname + '/public'));

models.User.sync({})
.then(function() {
  return models.Page.sync({})
})
.then(function(){
  app.listen(3000)
})
.catch(console.error)
