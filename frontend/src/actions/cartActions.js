import axios from 'axios'
import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
} from '../constants/cartConstants.js'

const addToCart = (id, qty) => async (dispatch, getState) => {

    const { data } = await axios.get(`/products/${id}`)

    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            productID: data._id,
            name: data.name,
            price: data.price,
            countInStock: data.countInStock,
            qty
        }
    })

    localStorage.setItem(
        'cartItems', JSON.stringify(getState.cart.cartItems)
    )
}

