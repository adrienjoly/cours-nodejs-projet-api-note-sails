var bcrypt = require('bcrypt');
const User = require('../models/User');
/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  'signup': async function(req, res) {
    let {username, password}= req.body;
    let db = sails.getDatastore().manager;
    let user = await db.collection('users').findOne({username: username});
    if(user !== null){
      res.forbidden('User already registered in database');
      return;
    }
    try {
      password = bcrypt.hashSync(password, 5);
      await db.collection('users').insertOne({username: username, password: password});
    } catch (error) {
      console.error(error);
      res.json({
        status: 500,
        message: 'An error occured while registering'
      });
      return;
    }
    res.json({
      status: 201,
      message: 'User registered'
    });
  },

  'login': async function(req, res) {
    let db = sails.getDatastore().manager;
    const {username, password} = req.body;
    let user;
    try {
      user = await db.collection('users').findOne({username: username});
      console.log(user);
    } catch (error) {
      console.error(error);
      res.json({
        status: 404,
        message: 'Couldn\'t find you in our database'
      });
      return;
    }
    bcrypt.compare(password, user.password, (err, result) => {
      if(result) {
        return res.json({
          user:user.username,
          token: jwToken.sign(user)
        });
      } else if(err) {
        return res.forbidden({err: 'Username and password combination do not match'});
      }
    });
  },
  'check': function(req, res) {
    return res.json(req.user);
  },
};

