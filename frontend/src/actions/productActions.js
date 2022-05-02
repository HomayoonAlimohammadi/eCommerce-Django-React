import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL
} from '../constants/productConstants.js'
import axios from 'axios'


const listProducts = () => async (dispatch) => {

    try{

        dispatch({
            type: PRODUCT_LIST_REQUEST,
            payload: []
        })

        const {data} = axios.get('/api/products/')

        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data
        })

    }catch(error){

        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.reponse
        })
    }
}

// export default listProducts