import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { getCart, getTotal, postOrder } from '../../../redux/productsRedux.js';

import './OrderForm.scss';


class OrderForm extends React.Component {
    static propTypes = {
        cart: PropTypes.oneOfType([PropTypes.array,PropTypes.object]),
        total: PropTypes.number,
        addOrder: PropTypes.func
    };
    
    state = {
        order: {
          fname: '',
          lname: '',
          address: '',
          city: '',
          email: '',
          phone: '',
          comment: '',
          cart: [],
          price: 0
        },
        isError: false,
        success: false,
    };

    componentDidMount() {
        setTimeout(() => {
            const { cart, total } = this.props;
            this.setState({             
            order: {
                cart: this.state.order.cart.concat(cart),
                price: total
            }});}, 1000);
    }
      
    updateTextField = ({ target }) => {
        const { order } = this.state;
        const { value, name } = target;

        this.setState({ order: { ...order, [name]: value }});
    };

    submitForm = async (e) => {
        const { order } = this.state;
        const { addOrder } = this.props;
        e.preventDefault();

        if(order.fname && order.lname && order.address && order.city && order.email && order.phone) {
          await addOrder(order);
            
          this.setState({ 
            order: {
                fname: order.fname,
                lname: order.lname,
                address: order.address,
                city: order.city,
                email: order.email,
                phone: order.phone,
                comment: order.comment
            },
            isError: false,
            success: true,
          });
        } else {
          this.setState({ isError: true });
        }
    };

    render() {
        const { cart, total } = this.props;
        const { order } = this.state;

        return (
            <div className="summary-wrapper">
                {this.state.success ? 
                <div className="summary-list">
                    <h3>We've received Your order!</h3>
                    <p>Check Your e-mail ({order.email}) for details.</p>
                </div> : 
                <div>
                    <div className="summary-list">
                        <h3>Order summary:</h3>
                        {cart.map(product => {
                            return (
                                <div key={product._id}>
                                    <p>{product.name} ({product.quantity})</p>
                                </div>
                            )
                        })}
                        <h4>Cost: {total}$</h4>
                    </div>
                    <form onSubmit={this.submitForm}>
                        <div>
                            <label htmlFor="fname">First name: </label>
                            <input type="text" id="fname" name="fname" required onChange={this.updateTextField}/>
                        </div>
                        <div>
                            <label htmlFor="lname">Last name: </label>
                            <input type="text" id="lname" name="lname" required onChange={this.updateTextField}/>
                        </div>
                        <div>
                            <label htmlFor="address">Address: </label>
                            <input type="text" id="address" name="address" required onChange={this.updateTextField}/>
                        </div>
                        <div>
                            <label htmlFor="city">City: </label>
                            <input type="text" id="city" name="city" required onChange={this.updateTextField}/>
                        </div>
                        <div>
                            <label htmlFor="email">E-mail: </label>
                            <input type="email" id="email" name="email" required onChange={this.updateTextField}/>
                        </div>
                        <div>
                            <label htmlFor="phone">Phone: </label>
                            <input type="tel" id="phone" name="phone" required onChange={this.updateTextField}/>
                        </div>
                        <div>
                            <label htmlFor="comment">Comment: </label>
                            <input type="text" id="comment" name="comment"  onChange={this.updateTextField}/>
                        </div>
                        <button onClick={this.test} type="submit">Submit</button>
                    </form>
                </div>}
            </div>
        )
    }
};

const mapStateToProps = state => ({
    cart: getCart(state),
    total: getTotal(state)
});

const mapDispatchToProps = (dispatch) => {
       
    return {
        addOrder: (order, cart) => dispatch(postOrder(order, cart))
    };
};

const OrderFormContainer = connect(mapStateToProps, mapDispatchToProps)(OrderForm);
  
export {
    OrderFormContainer as OrderForm,
    OrderForm as OrderFormComponent,
};
  