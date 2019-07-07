const User = require('../controllers/user');

module.exports = app => {
  app.route('/api/users').post(User.post);
};
