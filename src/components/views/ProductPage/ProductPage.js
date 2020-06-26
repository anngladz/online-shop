import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { getById, addToCart } from '../../../redux/productsRedux.js';

import Product from '../../features/Product/Product';

import './ProductPage.scss';

class ProductPage extends React.Component {
    static propTypes = {
        productById: PropTypes.oneOfType([PropTypes.array,PropTypes.object]),
        addToCart: PropTypes.func
    };

    handleCart = (id) => {
        this.props.addToCart(id);
    }

    render() {
        const { productById } = this.props;

        return (
            <div className="product-page">
                {productById.map(product => {
                    return (
                        <div className="product" key={product.id}>
                            <Product image={product.image} name={product.name} price={product.price} description={product.description} />
                            <button onClick={() => {this.handleCart(product.id)}}>Add to cart</button>
                        </div>
                    );
                })}
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    const id = props.match.params.id;

    return {
      productById: getById(state,id),
    };
};

const mapDispatchToProps = (dispatch) =>{
    
    return {
        addToCart: (id) => {dispatch(addToCart(id))}
    };
}

const ProductPageContainer = connect(mapStateToProps, mapDispatchToProps)(ProductPage);
  
export {
    ProductPageContainer as ProductPage,
    ProductPage as ProductPageComponent,
};
  