import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
} from '../constants/cartConstants.js'


export default cartReducer

function cartReducer(state={cartItems: []}, action) {

    switch(action.type) {

        case CART_ADD_ITEM:

            const item = action.payload
            const existItem = state.cartItems.find(
                x => x.productID === item.productID
            )

            if (existItem) {

                return {
                    ...state,
                    cartItems: state.cartItems.map(
                        x => x.productID === existItem.productID 
                        ? item
                        : x
                    )
                }

            } else {
                
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }

        // case CART_REMOVE_ITEM:
        //     handle remove item

        default:
            return state
    }

}