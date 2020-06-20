import React from 'react';
import PropTypes from 'prop-types';

import './Product.scss';

const Product = ({ image, name, price }) => (
    <div className="product">
        <img src={image} alt="product"></img>
        <p>{name}</p>
        <p>{price}$</p>
    </div>
  );

Product.propTypes = {
    image: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.string,
};

export default Product;