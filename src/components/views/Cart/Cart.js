import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { getCart, getTotal, removeItem, addQuantity, subtractQuantity } from '../../../redux/productsRedux.js';

import './Cart.scss';

class Cart extends React.Component {
    static propTypes = {
        cart: PropTypes.oneOfType([PropTypes.array,PropTypes.object]),
        total: PropTypes.number,
        removeItem: PropTypes.func,
        addQuantity: PropTypes.func,
        subtractQuantity: PropTypes.func,
    };

    handleRemove = (id) => {
        this.props.removeItem(id);
    }

    handleAddQuantity = (id) => {
        this.props.addQuantity(id);
    }

    handleSubtractQuantity = (id) => {
        this.props.subtractQuantity(id);
    }

    render() {
        const { cart, total } = this.props;

        return (
            <div className="cart-wrapper">
                {cart.length ? cart.map(product => {
                    return (
                        <div className="cart-item" key={product._id}>
                            <div className="item-info">
                                <img src={product.image} alt="product"></img><p>{product.name} {product.price}$</p>
                            </div>
                            <div className="quantity">
                                <button onClick={()=>{this.handleAddQuantity(product._id)}}>+</button>
                                <p>{product.quantity}</p>
                                <button onClick={()=>{this.handleSubtractQuantity(product._id)}}>-</button>
                                <button onClick={()=>{this.handleRemove(product._id)}}>X</button>
                            </div>
                        </div>       
                    );
                }) : <div><p>Cart is empty!</p></div>}
                {cart.length ? <div className="summary"><p className="cart-total">Total: <span>{total}$</span></p><a href="/form"><button>Place order</button></a></div>: null}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    cart: getCart(state),
    total: getTotal(state)
});

const mapDispatchToProps = (dispatch) =>{
    
    return {
        removeItem: (id) => {dispatch(removeItem(id))},
        addQuantity: (id) => {dispatch(addQuantity(id))},
        subtractQuantity: (id) => {dispatch(subtractQuantity(id))}
    };
}

const CartContainer = connect(mapStateToProps, mapDispatchToProps)(Cart);
  
export {
    CartContainer as Cart,
    Cart as CartComponent,
};
  