import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useParams, Link, useNavigate } from 'react-router-dom'
import { addToCart, removeFromCart } from '../actions/cartActions.js'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message.js'


function CartScreen() {

    let navigate = useNavigate()
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

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    const checkoutHandler = () => {
        navigate('/login?redirect=../shipping')
    }

    return (
        <Row>
            <Col md={8}>
                {cartItems.length === 0 ? (
                    <Message variant='info'>
                        Your shopping cart is empty. <Link to='/'>Go Back</Link>
                    </Message>
                ) : (
                    <ListGroup variant='flush'>
                        {cartItems.map(item => (
                            <ListGroup.Item key={item.productID}>
                                <Row>
                                    <Col md={2}>
                                        <Image src={item.image} alt={item.name} fluid rounded/>
                                    </Col>
                                    <Col md={3}>
                                        <Link to={`/product/${item.productID}`}>{item.name}</Link>
                                    </Col>
                                    <Col md={2}>
                                        ${item.price}
                                    </Col>
                                    <Col md={3}>
                                    <Form.Control
                                        value={item.qty}
                                        onChange={(e) => dispatch(addToCart(item.productID, Number(e.target.value)))}
                                        as='select'
                                        >
                                            {
                                            [...Array(item.countInStock).keys()].map((x) => (
                                                <option key={x+1} value={x+1}>
                                                    {x+1}
                                                </option>
                                            ))
                                            }
                                </Form.Control>
                                    </Col>
                                    <Col md={1}>
                                        <Button 
                                            type='button'
                                            variant='light'
                                            onClick={() => removeFromCartHandler(item.productID)}
                                        >
                                            <i class="fa-solid fa-trash"></i>
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h3>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items</h3>
                            <h3>${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <div className='d-grid gap-2'>
                                <Button
                                type='button'
                                className='btn-block'
                                disabled={cartItems.length === 0}
                                onClick={checkoutHandler}
                                >
                                    Proceed to Checkout 
                                </Button>
                            </div>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    )
}

export default CartScreen