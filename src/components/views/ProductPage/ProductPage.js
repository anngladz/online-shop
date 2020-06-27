import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { getAll, getLoadingState, addToCart, fetchProductById } from '../../../redux/productsRedux.js';

import Product from '../../features/Product/Product';

import './ProductPage.scss';

class ProductPage extends React.Component {
    static propTypes = {
        products: PropTypes.oneOfType([PropTypes.array,PropTypes.object]),
        loading: PropTypes.shape({
            active: PropTypes.bool,
            error: PropTypes.oneOfType([PropTypes.bool,PropTypes.string]), 
          }),
        fetchProductById: PropTypes.func,
        addToCart: PropTypes.func
    };

    componentDidMount(){
        this.props.fetchProductById();
      }

    handleCart = (id) => {
        this.props.addToCart(id);
    }

    render() {
        const { products, loading: { active, error } } = this.props;
        
        if(active || !products){
            return (
              <div>
                <p>Loading...</p>
              </div>
            );
          } else if(error) {
            return (
              <div>
                <p>Error! Details:</p>
                <pre>{error}</pre>
              </div>
            );
          } else {
            return (
                <div className="product-page">
                    <div className="product">
                        <Product image={products.image} name={products.name} price={products.price} description={products.description} />
                        <button onClick={() => {this.handleCart(products._id)}}>Add to cart</button>
                </div>                  
            </div>)
        }
    }
}

const mapStateToProps = state => ({
    products: getAll(state),
    loading: getLoadingState(state),
  });

const mapDispatchToProps = (dispatch, props) => {
    return {
        addToCart: (id) => {dispatch(addToCart(id))},
        fetchProductById: (id = props.match.params.id) => dispatch(fetchProductById(id))
    };
}

const ProductPageContainer = connect(mapStateToProps, mapDispatchToProps)(ProductPage);
  
export {
    ProductPageContainer as ProductPage,
    ProductPage as ProductPageComponent,
};
  