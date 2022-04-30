import React, {useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom' 
import { Row, Col, Button, ListGroup, Card, Image } from 'react-bootstrap'
import Rating from '../components/Rating.js'
import axios from 'axios'


function ProductScreen(props) {

    const id = useParams().id
    const [product, setProduct] = useState([])

    useEffect(() => {
        async function fetchProduct() {
            let {data} = await axios.get(`/api/products/${id}`)
            setProduct(data)
        }
    
        fetchProduct(id)
    }, [])

    return (
        <div>
            <Link to='/' className='btn btn-light my-3'>
                Go Back
            </Link>

            <Row>
                <Col md='6'>
                    <Image src={product.image} alt={product.name} fluid />
                </Col>

                <Col md='3'>
                    <ListGroup variant='flush'> 

                        <ListGroup.Item as='h4'>
                            {product.name}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Rating 
                            value={product.rating}
                            text={`${product.rating} from ${product.numReviews}`}
                            color='#f8e528'
                            />
                        </ListGroup.Item>

                        <ListGroup.Item as='h5'>
                            <strong>Price: ${product.price}</strong>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            Description: {product.description}
                        </ListGroup.Item>

                    </ListGroup>
                </Col>

                <Col md='3'>

                    <Card>

                    <ListGroup>

                        <ListGroup.Item>
                            <Row>
                                <Col>
                                Price:
                                </Col>
                                <Col>
                                ${product.price}
                                </Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Status:</Col>
                                <Col>
                                {product.countInStock > 0
                                ? 'Available'
                                : 'Out of Stock'}
                                </Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row className='m-1'>
                                <Button disabled={product.countInStock === 0} 
                                className='btn-block'>Add to Cart</Button>
                            </Row>
                        </ListGroup.Item>

                    </ListGroup>

                    </Card>

                </Col>
            </Row>


        </div>
    )
}

export default ProductScreen