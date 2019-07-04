const Product = require('../controllers/product');

module.exports = app => {
  app.route('/api/products').get(Product.list);
  app.route('/api/products').post(Product.post);
};
