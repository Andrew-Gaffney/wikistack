const express = require('express')

var router = express.Router();

var models = require('../models')
var Page = models.Page;
var User = models.User;

router.get('/add', function(req, res, next) {
  res.render('addpage')
});
router.get('/:title', function(req, res, next){
  Page.findOne({
    where: {
      urlTitle: req.params.title
    }
  })
  .then(function(foundPage){
    User.findOne({
      where: {
        id: foundPage.authorId
      }
    }).then(function(foundUser){
          res.render('wikipage', {page: foundPage, user: foundUser})
    })
  })
  .catch(next)
})
router.post('/', function(req, res, next){

  var user;
  User.findOne({
    where: {
      name: req.body.author
    }
  }).then(function(foundUser){

    if (!foundUser){
      user = User.build({
        name: req.body.author,
        email: req.body.email
      })
      user.save()
    }
    else {
      user = foundUser;
        user.save();
    }
    var page = Page.build({
      title: req.body.title,
      content: req.body.content,
      authorId: user.id
    })
    page.save().then(function(savedPage){
      res.redirect(savedPage.urlTitle)
    }).catch(next);
  })
});
router.get('/', function(req, res, next){
  Page.findAll({
    attributes: ['title', 'urlTitle']
  })
  .then(function(pages){
    res.render('index', {pages: pages})
  })
  // res.redirect('/')
});


module.exports = router;
