var bcrypt = require('bcrypt');
/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  'signup': async function(req, res) {
    let {username, password}= req.body;
    let user = await sails.models.users.findOne({username: username});
    if(user){
      res.status(400).send({error: 'Cet identifiant est déjà associé à un compte'});
      return;
    }
    let insertedUser;
    try {
      password = bcrypt.hashSync(password, 5);
      insertedUser = await sails.models.users.create({username: username, password: password}).fetch();
    } catch (error) {
      console.error(error);
      res.json({
        status: 500,
        message: 'An error occured while registering'
      });
      return;
    }
    res.json({
      error: null,
      token: jwToken.sign(insertedUser._id)
    });
  },

  'login': async function(req, res) {
    let {username, password} = req.body;
    let user;
    let db = sails.getDatastore().manager;
    user = await db.collection('users').findOne({username: username});
    try {
      if(user) {
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

