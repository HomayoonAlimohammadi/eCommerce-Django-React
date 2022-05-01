import { composeWithDevTools } from 'redux-devtools-extension'
import { legacy_createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'


const reducer = combineReducers({})
const middleware = [thunk]
const initialState = {}

const store = legacy_createStore(reducer, initialState,
                            composeWithDevTools(applyMiddleware(...middleware)))

export default store