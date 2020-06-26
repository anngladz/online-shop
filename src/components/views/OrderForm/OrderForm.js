import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import './OrderForm.scss';

class OrderForm extends React.Component {
    static propTypes = {
        products: PropTypes.oneOfType([PropTypes.array,PropTypes.object]),
    };


    render() {
        const { cart } = this.props;

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
                </div>
            <form>
                <div>
                    <label for="fname">First name: </label>
                    <input type="text" id="fname" name="fname" required/>
                </div>
                <div>
                    <label for="lname">Last name: </label>
                    <input type="text" id="lname" name="lname" required/>
                </div>
                <div>
                    <label for="address">Address: </label>
                    <input type="text" id="address" name="address" required/>
                </div>
                <div>
                    <label for="city">City: </label>
                    <input type="text" id="city" name="city" required/>
                </div>
                <div>
                    <label for="email">E-mail: </label>
                    <input type="email" id="email" name="email" required/>
                </div>
                <div>
                    <label for="phone">Phone: </label>
                    <input type="tel" id="phone" name="phone" required/>
                </div>
                <button type="submit">Submit</button>
            </form>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    cart: state.products.cart,
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
  