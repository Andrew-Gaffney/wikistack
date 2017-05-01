const express = require('express')

var router = express.Router();


var models = require('../models')
var Page = models.Page;
var User = models.User;

router.get('/', function(req, res, next){
  User.findAll({}).then(function(users){
    res.render('users', {users: users})
  }).catch(next);
})

router.get('/:id', function(req, res, next){
   User.findOne({
    where: {
      id: req.params.id
    }
  }).then(function(foundUser){
    Page.findAll({
      where: {
        authorId: foundUser.id
      }
    }).then(function(pages){
      res.render('user', {pages: pages, user: foundUser})
    })
  })
  .catch(next)
})

module.exports = router;
