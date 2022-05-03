import { composeWithDevTools } from 'redux-devtools-extension'
import { legacy_createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import cartReducer from './reducers/cartReducers.js'
import { 
    productListReducer,
    productDetailsReducer,
} from './reducers/productReducers.js'


const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
})
const middleware = [thunk]

const cartItemsFromStorage = localStorage.getItem('cartItems') 
        ? JSON.parse(localStorage.getItem('cartItems'))
        : []

const initialState = {
    cart: {cartItems: cartItemsFromStorage}
}

const store = legacy_createStore(reducer, initialState,
    composeWithDevTools(applyMiddleware(...middleware)))

export default store