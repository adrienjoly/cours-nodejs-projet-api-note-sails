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
      res.status(400).send({error: 'Cet identifiant est déjà associé à un compte'});
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
    let {username, password} = req.body;
    let db = sails.getDatastore().manager;
    let user;
    user = await db.collection('users').findOne({username: username});
    try {
      if(user) {
        //console.log(user._id);
        let result = bcrypt.compareSync(password, user.password);
        if(result){
          res.json({
            error: null,
            token: jwToken.sign(user._id)
          });
          return;
        }else{
          res.status(403).send({error: 'Les mots de passses ne correspondent pas'});
          return;
        }
      } else {
        res.status(403).send({error: 'Cet identifiant est inconnu'});
        return;
      }
    } catch (error) {
      console.error(error);
      res.status(403).send({error});
      return;
    }
  },
  'check': function(req, res) {
    return res.json(req.user);
  },
};

