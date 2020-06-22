/* selectors */
export const getAll = ({ products }) => products.data;
export const getById = ({ products }, id) => products.data.filter(item => item.id === id);

/* action name creator */
const reducerName = 'products';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const FETCH_START = createActionName('FETCH_START');
const FETCH_SUCCESS = createActionName('FETCH_SUCCESS');
const FETCH_ERROR = createActionName('FETCH_ERROR');
const ADD_TO_CART = createActionName('ADD_TO_CART');

/* action creators */
export const fetchStarted = payload => ({ payload, type: FETCH_START });
export const fetchSuccess = payload => ({ payload, type: FETCH_SUCCESS });
export const fetchError = payload => ({ payload, type: FETCH_ERROR });
export const addToCart = id => ({ id, type: ADD_TO_CART });

/* thunk creators */


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
      let addedItem = statePart.data.find(item => item.id === action.id);
      let existed_item = statePart.cart.find(item => action.id === item.id);
      
      if (existed_item) {
        addedItem.quantity += 1;
        return {
          ...statePart,
          total: statePart.total + addedItem.price 
        }
      }
      else {
        addedItem.quantity = 1;
        let newTotal = statePart.total + addedItem.price; 
        return {
          ...statePart,
          cart: [...statePart.cart, addedItem],
          total : newTotal
          }          
        }
    }
    default:
      return statePart;
  }
};
