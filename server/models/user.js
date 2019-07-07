const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const timestamps = require('mongoose-timestamp');
const mongooseStringQuery = require('mongoose-string-query');

const UserSchema = new Schema(
  {
    name: {
      type: String,
    },
    address: {
      type: String,
    },
    email: {
      type: String,
      index: true,
    },
    other1: {
      type: String,
    },
    other2: {
      type: String,
    },
    other3: {
      type: String,
    },
    products: {
      type: Schema.Types.Mixed,
      default: [],
    },
  },
  { collection: 'users' },
);

UserSchema.plugin(timestamps);
UserSchema.plugin(mongooseStringQuery);

UserSchema.index({ email: 1 });

// eslint-disable-next-line no-multi-assign
module.exports = exports = mongoose.model('User', UserSchema);
