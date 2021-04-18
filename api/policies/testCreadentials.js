module.exports = function (req, res, next) {
  let {username, password}= req.body;
  if(password.length < 4) {
    res.status(400).send('Le mot de passe doit contenir au moins 4 caractères');
    return;
  }
  if(username.length < 2 || username.length > 20 ) {
    res.status(400).send('Votre identifiant doit contenir entre 2 et 20 caractères');
    return;
  }

  if (!/^[a-z]+$/.test(username)) {
    res.status(400).send('Votre identifiant ne doit contenir que des lettres minuscules non accentuées');
    return;
  }
  next();
};
