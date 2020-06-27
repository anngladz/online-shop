import axios from 'axios';
import { api, url } from './api';

/* selectors */
export const getAll = ({ products }) => products.data;
// export const getById = ({ products }, id) => products.data.filter(item => item.id === id);
export const getLoadingState = ({ products }) => products.loading;
export const getCart = ({ products }) => products.cart;
export const getTotal = ({ products }) => products.total;

/* action name creator */
const reducerName = 'products';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const FETCH_START = createActionName('FETCH_START');
const FETCH_SUCCESS = createActionName('FETCH_SUCCESS');
const FETCH_ERROR = createActionName('FETCH_ERROR');
const ADD_TO_CART = createActionName('ADD_TO_CART');
const REMOVE_ITEM = createActionName('REMOVE_ITEM');
const ADD_QUANTITY = createActionName('ADD_QUANTITY');
const SUB_QUANTITY = createActionName('SUB_QUANTITY');
const ADD_ORDER = createActionName('ADD_ORDER');

/* action creators */
export const fetchStarted = payload => ({ payload, type: FETCH_START });
export const fetchSuccess = payload => ({ payload, type: FETCH_SUCCESS });
export const fetchError = payload => ({ payload, type: FETCH_ERROR });
export const addToCart = id => ({ id, type: ADD_TO_CART });
export const removeItem = id => ({ id, type: REMOVE_ITEM });
export const addQuantity = id => ({ id, type: ADD_QUANTITY });
export const subtractQuantity = id => ({ id, type: SUB_QUANTITY });
export const addOrder = (order) => ({ order, type: ADD_ORDER});

/* thunk creators */
export const fetchProducts = () => {
  return (dispatch) => {
    dispatch(fetchStarted());

    axios
      .get(`${url}${api}/products`)
      .then(res => {
        dispatch(fetchSuccess(res.data));
      })
      .catch(err => {
        dispatch(fetchError(err.message || true));
      });
  };
};

export const fetchProductById = (id) => {
  return (dispatch) => {
    dispatch(fetchStarted(id));
    
    axios
      .get(`${url}${api}/products/${id}`)
      .then(res => {
        dispatch(fetchSuccess(res.data));
      })
      .catch(err => {
        dispatch(fetchError(err.message || true));
      });
  };
};

export const postOrder = function(order) {
  return dispatch => {
    dispatch(addOrder(order));

    axios
      .post(`${url}${api}/orders/add`, order)
      .then(res => {
        dispatch(addOrder(res));
      })
      .catch(err => console.error('error', err));
  };
};

/* reducer */
export const reducer = (statePart = [], action = {}) => {
  switch (action.type) {
    case FETCH_START: {
      return {
        ...statePart,
        loading: {
          active: true,
          error: false,
        },
      };
    }
    case FETCH_SUCCESS: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        data: action.payload,
      };
    }
    case FETCH_ERROR: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: action.payload,
        },
      };
    }
    case ADD_TO_CART: {
      let addedProduct = statePart.data;
      let productExist = statePart.cart.find(item => action.id === item._id);
      
      if (productExist) {
        return {
          ...statePart
        }
      }
      else {
        addedProduct.quantity = 1;
        let newTotal = statePart.total + addedProduct.price; 
        let inCart = statePart.inCart + 1;
        return {
          ...statePart,
          cart: [...statePart.cart, addedProduct],
          total : newTotal,
          inCart: inCart
          }          
        }
    }
    case REMOVE_ITEM: {
      let productRemove = statePart.cart.find(item => action.id === item._id);
      let newProducts = statePart.cart.filter(item => action.id !== item._id);

      let newTotal = statePart.total - (productRemove.price * productRemove.quantity);
      let inCart = statePart.inCart - 1;

      return {
          ...statePart,
          cart: newProducts,
          total: newTotal,
          inCart: inCart
      }
    }
    case ADD_QUANTITY: {
        let  addedProduct = statePart.cart.find(item => item._id === action.id)
        addedProduct.quantity += 1;
       
          let newTotal = statePart.total + addedProduct.price
          return {
              ...statePart,
              total: newTotal,
          }
    }
    case SUB_QUANTITY: {
      let addedProduct = statePart.cart.find(item => item._id === action.id) 

      if(addedProduct.quantity === 1){
          let newProducts = statePart.cart.filter(item => item._id !== action.id); 
          let newTotal = statePart.total - addedProduct.price;
          let inCart = statePart.inCart - 1;
          
          return {
            addedProduct,
              ...statePart,
              cart: newProducts,
              total: newTotal,
              inCart: inCart
          }
      }
      else {
          addedProduct.quantity -= 1;
          let newTotal = statePart.total - addedProduct.price;
          return {
              ...statePart,
              total: newTotal
          }
      }
    }
    case ADD_ORDER: {
      return {
        ...statePart,
        cart: [],
        total: 0,
        inCart: 0
      }
    }
    default:
      return statePart;
  }
};
