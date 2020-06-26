import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import './Header.scss';

class Header extends React.Component {
    static propTypes = {
        inCart: PropTypes.number,
    };

    render() {
        const { inCart } = this.props;

        return (
            <div className="wrapper">
            <div className="logo">
                <a href="/">
                    <h1>Nexeon</h1>
                    <p>tech store</p>
                </a>
            </div>
            <div className="cart">
                <a href="/">Store</a>
                <a href="/cart">My Cart</a><p>({inCart})</p>
                <a href="/cart"><img src="/img/cart.png" alt="Cart"></img></a>
            </div>
        </div>
        )
    }
}


const mapStateToProps = state => ({
    inCart: state.products.inCart,
});
  
const HeaderContainer = connect(mapStateToProps)(Header);
  
export {
    HeaderContainer as Header,
    Header as HeaderComponent,
};
  