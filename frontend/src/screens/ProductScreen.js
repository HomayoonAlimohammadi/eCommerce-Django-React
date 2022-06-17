import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom' 
import { Row, Col, Button, ListGroup, Card, Image, Form } from 'react-bootstrap'
import Rating from '../components/Rating.js'
import Loader from '../components/Loader.js'
import Message from '../components/Message.js'
import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails } from '../actions/productActions.js'


function ProductScreen() {

    let navigate = useNavigate()

    const [qty, setQty] = useState(1)

    const id = useParams().id
    const dispatch = useDispatch()
    const productDetails = useSelector(state => state.productDetails)
    const { loading, product, error } = productDetails

    useEffect(() => {
        
        dispatch(listProductDetails(id))

    }, [dispatch, id])


    const addToCartHandler = () => {
        navigate(`/cart/${id}?qty=${qty}`)
    }

    return (
        <div>
            <Link to='/' className='btn btn-light my-3'>
                Go Back
            </Link>

            {loading ? <Loader />
            : error ? <Message variant='danger'>{error}</Message>
            : 
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

                    {product.countInStock > 0 &&
                    <ListGroup.Item>
                        <Row>
                            <Col>Quantity:</Col>
                            <Col xs='auto' className='my-1'>
                                <Form.Control
                                value={qty}
                                onChange={(e) => setQty(e.target.value)}
                                as='select'
                                >
                                    {
                                    [...Array(product.countInStock).keys()].map((x) => (
                                        <option key={x+1} value={x+1}>
                                            {x+1}
                                        </option>
                                    ))
                                    }
                                </Form.Control>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                }
                    

                    <ListGroup.Item>
                        <Row className='m-1'>
                            <Button 
                            disabled={product.countInStock === 0} 
                            className='btn-block'
                            onClick={addToCartHandler}
                            >
                                Add to Cart
                            </Button>
                        </Row>
                    </ListGroup.Item>

                </ListGroup>

                </Card>

            </Col>
        </Row>
        }
        </div>
    )
}

export default ProductScreen