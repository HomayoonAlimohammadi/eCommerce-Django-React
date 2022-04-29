import {Card} from 'react-bootstrap'
import React from 'react'
import './Product.css'


function Product({ product }) {
    return (
        
        <Card className="my-3 p-3">
            <Card.Title>
                <a href={`/products/${product._id}`}>
                <Card.Img src={product.image} />
                </a>
            </Card.Title>

            <Card.Body>
                <a href={`/products/${product._id}`}>
                <Card.Title as='div'>
                    <strong>{product.name}</strong>
                </Card.Title>
                </a>

                <Card.Text as='div' className='my-5'>
                    {product.rating} from {product.numReviews} reviews
                </Card.Text>

                <Card.Text as='h3'>
                    ${product.price}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Product