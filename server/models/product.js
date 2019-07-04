const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const timestamps = require('mongoose-timestamp');
const mongooseStringQuery = require('mongoose-string-query');

const ProductSchema = new Schema(
  {
    productName: {
      type: String,
      index: true,
    },
    variable1: {
      type: Number,
      default: 0,
    },
    variable2: {
      type: Number,
      default: 0,
    },
    variable3: {
      type: Number,
      default: 0,
    },
    variable4: {
      type: Number,
      default: 0,
    },
    images: {
      type: Schema.Types.Mixed,
      default: [],
    },
    video: {
      type: String,
      trim: true,
    },
  },
  { collection: 'products' },
);

ProductSchema.plugin(timestamps);
ProductSchema.plugin(mongooseStringQuery);

ProductSchema.index({ productName: 1 });

// eslint-disable-next-line no-multi-assign
module.exports = exports = mongoose.model('Product', ProductSchema);
