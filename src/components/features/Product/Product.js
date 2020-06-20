import React from 'react';
import PropTypes from 'prop-types';

import './Product.scss';

const Product = ({ image, name, price, description }) => (
    <div className="single-product">
        <img src={image} alt="product"></img>
        <p>{name}</p>
        <p><span>Price:</span> {price}$</p>
        <p>{description}</p>
    </div>
  );

Product.propTypes = {
    image: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
    description: PropTypes.string,
};

export default Product;