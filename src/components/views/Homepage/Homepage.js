import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { getAll, getLoadingState, fetchProducts } from '../../../redux/productsRedux.js';

import Product from '../../features/Product/Product';

import './Homepage.scss';

class Homepage extends React.Component {
    static propTypes = {
        products: PropTypes.oneOfType([PropTypes.array,PropTypes.object]),
        loading: PropTypes.shape({
            active: PropTypes.bool,
            error: PropTypes.oneOfType([PropTypes.bool,PropTypes.string]), 
          }),
        fetchProducts: PropTypes.func
    };

    componentDidMount(){
        this.props.fetchProducts();
      }

    render(){ 
        const { products, loading: { active, error } } = this.props;
      
        if(active || !products.length){
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
            <div className="products-wrapper">
                {products.map(product => {
                    return (
                        <a key={product._id} className="product-link" href={'product/'+ product._id}><Product  image={product.image} name={product.name} price={product.price} /></a>
                    )
                })}
            </div>)
        }
    }
}

const mapStateToProps = state => ({
    products: getAll(state),
    loading: getLoadingState(state),
});

const mapDispatchToProps = dispatch => ({
    fetchProducts: () => dispatch(fetchProducts()),
  });
  
  
const HomepageContainer = connect(mapStateToProps, mapDispatchToProps)(Homepage);
  
export {
    HomepageContainer as Homepage,
    Homepage as HomepageComponent,
};
  