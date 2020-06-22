import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { getById, addToCart } from '../../../redux/productsRedux.js';

import Product from '../../features/Product/Product';

import './ProductPage.scss';

class ProductPage extends React.Component {
    static propTypes = {
        products: PropTypes.oneOfType([PropTypes.array,PropTypes.object]),
    };

    handleCart = (id) => {
        this.props.addToCart(id);
    }

    render() {
        const { productById, cart, total } = this.props;

        return (
            <div className="product-page">
                {productById.map(product => {
                    return (
                        <div className="product" key={product.id}>
                            <Product image={product.image} name={product.name} price={product.price} description={product.description} />
                            <div className="counter">
                                <button>+</button><p>0</p><button>-</button>
                            </div>
                            <button onClick={() => {this.handleCart(product.id)}}>Add to cart</button>
                        </div>
                    );
                })}
                {cart.map(product => {
                    return (
                        <div className="product" key={product.id}>
                            {product.name} {product.price} {total}
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
      cart: state.products.cart,
      total: state.products.total
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
  