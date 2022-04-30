import {Card} from 'react-bootstrap'
import React from 'react'
import './Product.css'
import Rating from './Rating.js'
import { Link } from 'react-router-dom'


function Product({ product }) {
    return (
        
        <Card className="my-3 p-3 product">
            <Card.Title>
                <Link to={`/product/${product._id}`}>

                <Card.Img src={product.image} />
                </Link>
            </Card.Title>

            <Card.Body>
                <Link to={`/product/${product._id}`}>
                <Card.Title as='div'>
                    <strong>{product.name}</strong>
                </Card.Title>
                </Link>

                <Card.Text as='div' className='my-5'>
                    <Rating 
                        value={product.rating} 
                        text={`${product.rating} from ${product.numReviews} reviews`}
                        color='#f8e825'
                    />
                </Card.Text>

                <Card.Text as='h3'>
                    ${product.price}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Product