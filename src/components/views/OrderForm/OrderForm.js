import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { getCart, getTotal } from '../../../redux/productsRedux.js';

import './OrderForm.scss';

class OrderForm extends React.Component {
    static propTypes = {
        cart: PropTypes.oneOfType([PropTypes.array,PropTypes.object]),
        total: PropTypes.number
    };


    render() {
        const { cart, total } = this.props;

        return (
            <div className="summary-wrapper">
                <div className="summary-list">
                    <h3>Order summary:</h3>
                    {cart.map(product => {
                        return (
                            <div key={product.id}>
                                <p>{product.name} ({product.quantity})</p>
                            </div>
                        )
                    })}
                    <h4>Cost: {total}$</h4>
                </div>
            <form>
                <div>
                    <label htmlFor="fname">First name: </label>
                    <input type="text" id="fname" name="fname" required/>
                </div>
                <div>
                    <label htmlFor="lname">Last name: </label>
                    <input type="text" id="lname" name="lname" required/>
                </div>
                <div>
                    <label htmlFor="address">Address: </label>
                    <input type="text" id="address" name="address" required/>
                </div>
                <div>
                    <label htmlFor="city">City: </label>
                    <input type="text" id="city" name="city" required/>
                </div>
                <div>
                    <label htmlFor="email">E-mail: </label>
                    <input type="email" id="email" name="email" required/>
                </div>
                <div>
                    <label htmlFor="phone">Phone: </label>
                    <input type="tel" id="phone" name="phone" required/>
                </div>
                <button type="submit">Submit</button>
            </form>
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

    };
}

const OrderFormContainer = connect(mapStateToProps, mapDispatchToProps)(OrderForm);
  
export {
    OrderFormContainer as OrderForm,
    OrderForm as OrderFormComponent,
};
  