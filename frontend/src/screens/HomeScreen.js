import React, { useState, useEffect } from 'react'
import {Container, Row, Col} from 'react-bootstrap'
// import products from '../products.js'
import Product from '../components/Product.js'
import axios from 'axios'


function HomeScreen() {

    const [products, setProducts] = useState([])

    useEffect(() => {
        async function fetchProducts() {
            let {data} = await axios.get('/api/products/')
            setProducts(data)
        }
    
        fetchProducts()
    }, [])
    

    return (
        <Container>
            <Row>
                {products.map(product => (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <Product product={product} />
                    </Col>
                ))}
            </Row>
        </Container>
    )
}

export default HomeScreen