import React, { useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product.js'
import { listProducts } from '../actions/productActions.js'
import Loader from '../components/Loader.js'
import Message from '../components/Message.js'
import { useDispatch, useSelector } from 'react-redux'


function HomeScreen() {

    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const { loading, products, error } = productList

    useEffect(() => {
        
        dispatch(listProducts())

    }, [dispatch])

    return (
        <div>
            <h1>Latest Products</h1>
            {loading ? <Loader />
            : error ? <Message variant='danger'>{error}</Message>
            :
            <Row>
                {products.map(product => (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <Product product={product} />
                    </Col>
                ))}
            </Row>
            }
        </div>
    )
}

export default HomeScreen