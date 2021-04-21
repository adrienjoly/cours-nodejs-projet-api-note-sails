module.exports = function(req, res, next) {
  var token;
  //Check if authorization header is present
  if(req.headers && req.headers['x-access-token']) {
    //authorization header is present
    token = req.headers['x-access-token'];
  } else {
    //authorization header is not present
    return res.json(401, {error: 'Utilisateur non connecté'});
  }
  jwToken.verify(token, (err, decoded) => {
    if(err) {
      return res.status(401).send({error: 'Invalid token'});
    }
    req.user = decoded;
    next();
  });
};
