import { composeWithDevTools } from 'redux-devtools-extension'
import { legacy_createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import cartReducer from './reducers/cartReducers.js'
import { 
    productListReducer,
    productDetailsReducer,
} from './reducers/productReducers.js'
import { userLoginReducer, userRegisterReducer, userDetailsReducer,
         userUpdateProfileReducer } from './reducers/userReducer.js'


const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
})
const middleware = [thunk]

const cartItemsFromStorage = localStorage.getItem('cartItems') 
        ? JSON.parse(localStorage.getItem('cartItems')) : []

const shippingAddressFromStorage = localStorage.getItem('shippingAddress') 
    ? JSON.parse(localStorage.getItem('shippingAddress')) : []

const userInfoFromStorage = localStorage.getItem('userInfo') 
        ? JSON.parse(localStorage.getItem('userInfo')) : null

const initialState = {
    cart: {cartItems: cartItemsFromStorage, shippingAddress: shippingAddressFromStorage},
    userLogin: {userInfo: userInfoFromStorage},
}

const store = legacy_createStore(reducer, initialState,
    composeWithDevTools(applyMiddleware(...middleware)))

export default store