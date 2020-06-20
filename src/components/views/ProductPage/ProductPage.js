import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { getById } from '../../../redux/productsRedux.js';

import Product from '../../features/Product/Product';

import './ProductPage.scss';

class ProductPage extends React.Component {
    static propTypes = {
        products: PropTypes.oneOfType([PropTypes.array,PropTypes.object]),
    };

    render() {
        const {  productById } = this.props;

        return (
            <div className="product-page">
                {productById.map(product => {
                    return (
                        <div className="product" key={product.id}>
                            <Product image={product.image} name={product.name} price={product.price} description={product.description} />
                            <div className="counter">
                                <button>+</button><p>0</p><button>-</button>
                            </div>
                            <button>Add to cart</button>
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

const ProductPageContainer = connect(mapStateToProps)(ProductPage);
  
export {
    ProductPageContainer as ProductPage,
    ProductPage as ProductPageComponent,
};
  