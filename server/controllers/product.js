require('isomorphic-fetch');
const { Dropbox } = require('dropbox');
const Product = require('../models/product');
const logger = require('../logger');
const config = require('../config');
const dropbox = new Dropbox({ accessToken: config.dropbox.accessToken });

exports.list = (req, res) => {
  const query = req.query || {};

  Product.apiQuery(query)
    .select('_id productName variable1 variable2 variable3 variable4')
    .then(products => {
      res.json(products);
    })
    .catch(err => {
      logger.error(err);
      res.status(422).send(err.errors);
    });
};

exports.post = (req, res) => {
  const data = Object.assign({}, req.body) || {};

  Product.create(data)
    .then(product => {
      const { _id: productId } = product;
      dropbox
        .filesCreateFolder({ path: `/${productId}` })
        .then(() => res.json(product))
        .catch(err => {
          logger.error(err);
          res.status(500).send(err);
        });
    })
    .catch(err => {
      logger.error(err);
      res.status(500).send(err);
    });
};

exports.put = (req, res) => {
  const data = req.body || {};
  const { _id: productId, createdAt, updatedAt, ...rest } = data;

  Product.findByIdAndUpdate(productId, { ...rest }, { new: true })
    // eslint-disable-next-line consistent-return
    .then(product => {
      if (!product) {
        return res.sendStatus(404);
      }

      res.json(product);
    })
    .catch(err => {
      logger.error(err);
      res.status(422).send(err.errors);
    });
};

exports.get = (req, res) => {
  Product.findById(req.params.productId)
    .then(product => {
      res.json(product);
    })
    .catch(err => {
      logger.error(err);
      res.status(422).send(err.errors);
    });
};

exports.delete = (req, res) => {
  Product.findByIdAndDelete(req.params.productId)
    .then(product => {
      res.json(product);
    })
    .catch(err => {
      logger.error(err);
      res.status(422).send(err.errors);
    });
};
