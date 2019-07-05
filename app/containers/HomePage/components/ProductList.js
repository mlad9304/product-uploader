import React from 'react';
import PropTypes from 'prop-types';

import Product from './Product';

function ProductList({ products }) {
  let renderedProducts = React.Fragment;
  if (products) {
    renderedProducts = products.map(product => {
      const { _id: productId } = product;
      return <Product key={productId} product={product} />;
    });
  }
  return renderedProducts;
}

ProductList.propTypes = {
  products: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
};

export default ProductList;
