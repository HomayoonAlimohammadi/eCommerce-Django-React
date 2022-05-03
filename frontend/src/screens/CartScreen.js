import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom'
import { addToCart } from '../actions/cartActions.js'


function CartScreen() {

    const productID = useParams().id
    const location = useLocation().search
    const qty = location ? Number(location.split('=')[1]) : 0

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const { cartItems } = cart
    console.log('cartItems:', cartItems)

    useEffect(() => {

        if (productID) {
            dispatch(addToCart(productID, qty))
        }
        

    }, [dispatch, qty, productID])

    return (
        <div>
            Cart
        </div>
    )
}

export default CartScreen