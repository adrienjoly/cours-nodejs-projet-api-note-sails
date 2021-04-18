var jwt = require('jsonwebtoken');
var dotenv = require('dotenv');
dotenv.config();
module.exports = {
  'sign': function(payload) {
    return jwt.sign({
      data: payload
    }, process.env.JWT_KEY, {expiresIn: '24h'});
  },
  'verify': function(token, callback) {
    jwt.verify(token, process.env.JWT_KEY, callback);
  }
};
