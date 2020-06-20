import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { getAll } from '../../../redux/productsRedux.js';

import Product from '../../features/Product/Product';

import './Homepage.scss';

class Homepage extends React.Component {
    static propTypes = {
        products: PropTypes.oneOfType([PropTypes.array,PropTypes.object]),
    };

    render() {
        const { products } = this.props;

        return (
            <div className="products-wrapper">
                {products.map(product => {
                    return (
                        <Product key={product.id} image={product.image} name={product.name} price={product.price} />
                    )
                })}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    products: getAll(state),
});
  
const HomepageContainer = connect(mapStateToProps)(Homepage);
  
export {
    HomepageContainer as Homepage,
    Homepage as HomepageComponent,
};
  