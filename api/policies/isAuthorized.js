module.exports = function(req, res, next) {
  var token;
  //Check if authorization header is present
  if(req.headers && req.headers['x-access-token']) {
    //authorization header is present
    token = req.headers['x-access-token'];
  } else {
    //authorization header is not present
    return res.json(401, {err: 'No Token was found'});
  }
  jwToken.verify(token, (err, decoded) => {
    if(err) {
      return res.json(401, {err: 'Invalid token'});
    }
    req.user = decoded;
    next();
  });
};
