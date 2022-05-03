import { composeWithDevTools } from 'redux-devtools-extension'
import { legacy_createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { 
    productListReducer,
    productDetailsReducer,
} from './reducers/productReducers.js'


const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
})
const middleware = [thunk]
const initialState = {}

const store = legacy_createStore(reducer, initialState,
    composeWithDevTools(applyMiddleware(...middleware)))

export default store