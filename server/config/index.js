require('dotenv').config({ path: './server/.env' });

module.exports = {
  env: process.env.NODE_ENV || 'development',
  database: {
    uri: process.env.MONGODB_URI,
  },
  dropbox: {
    accessToken: process.env.DROPBOX_ACCESS_TOKEN,
  },
};
