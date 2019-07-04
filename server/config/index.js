require('dotenv').config({ path: './.env' });

module.exports = {
  env: process.env.NODE_ENV || 'development',
  database: {
    uri:
      'mongodb://root:dmA20f0T44bHo8bP@ds347467.mlab.com:47467/product_uploader',
  },
};
