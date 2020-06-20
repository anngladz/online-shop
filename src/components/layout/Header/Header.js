import React from 'react';

import './Header.scss';

const Header = () => (
    <div className="wrapper">
        <div className="logo">
            <a href="/">
                <h1>Nexeon</h1>
                <p>tech store</p>
            </a>
        </div>
        <div className="cart">
            <a href="/">Store</a>
            <a href="/cart">My Cart</a>
            <a href="/cart"><img src="img/cart.png" alt="Cart"></img></a>
        </div>
    </div>
  );

export default Header;