require('isomorphic-fetch');
const User = require('../models/user');
const logger = require('../logger');

exports.post = (req, res) => {
  const data = Object.assign({}, req.body) || {};

  User.create(data)
    .then(user => res.json(user))
    .catch(err => {
      logger.error(err);
      res.status(500).send(err);
    });
};
