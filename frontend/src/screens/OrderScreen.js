import React, {useEffect} from 'react' 
import {Row, Col, ListGroup, Image, Card} from 'react-bootstrap'
import {Link, useParams} from 'react-router-dom'
import Message from '../components/Message.js'
import Loader from '../components/Loader.js'
import {useDispatch, useSelector} from 'react-redux'
import {getOrderDetails} from '../actions/orderActions.js'


function OrderScreen() {

    const orderDetails = useSelector(state => state.orderDetails)
    const {order, error, loading} = orderDetails
    const orderId = useParams().id
    const dispatch = useDispatch() 

    if (!loading && !error) {
        order.itemsPrice = Number(order.order_items.reduce((acc, item) => acc + item.price * item.qty, 0)).toFixed(2)
    }

    useEffect(() => {
        if (!order || order._id !== Number(orderId)) {
            dispatch(getOrderDetails(orderId))
        }
        
    }, [order, orderId, dispatch])

    return loading ? (
        <Loader />
    ) : error ? (
        <Message variant='danger'>{error}</Message>
    ) : (
    <div>
        <h1>Order: {order._id}</h1>
        <Row>
            <Col md={8}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Shipping</h2>
                        <p><strong>Name: </strong>{order.user.name}</p>
                        <p><strong>Email: </strong><a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
                        
                        <p>
                            <strong>Shipping: </strong>
                            
                            {order.shipping_address.address},
                            {' ' + order.shipping_address.city},
                            {' ' + order.shipping_address.country}
                            {' - ' + order.shipping_address.postalCode}  

                            <p>{order.isDelivered ? (
                                <Message variant='success'>Delivered on {order.deliveredAt}</Message>
                            ) : (
                                <Message variant='warning'>Not Delivered</Message>
                            )}</p>
                            
                        </p>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h2>Payment Method</h2>
                        <p>{order.isPaid ? (
                            <Message variant='success'>Paid on {order.paidAt}</Message>
                        ) : (
                            <Message variant='warning'>Not Paid</Message>
                        )}</p>
                        <p>
                            <strong>Method: </strong>
                            {order.paymentMethod}
                             
                        </p>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h2>Order Items</h2>
                        {order.order_items.length === 0 ? <Message variant='info'>
                            Your order is empty.
                        </Message> : (
                            <ListGroup variant='flush'>
                                {order.order_items.map((item, index) => (
                                    <ListGroup.Item key={index}>
                                        <Row>
                                            <Col md={1}>
                                                <Image src={item.image} alt={item.name} fluid rounded/>
                                            </Col>
                                            <Col>
                                                <Link to={`/product/${item.productID}`}>{item.name}</Link>
                                            </Col>
                                            <Col md={4}>
                                                {item.qty} x ${item.price} = {(item.qty * item.price).toFixed(2)}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        )}
                    </ListGroup.Item>
                </ListGroup>
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Order Summary</h2>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Items:</Col>
                                <Col>${order.itemsPrice}</Col>

                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Shipping:</Col>
                                <Col>${order.shippingPrice}</Col>
                                
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Tax:</Col>
                                <Col>${order.taxPrice}</Col>
                                
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col><strong>Total:</strong></Col>
                                <Col>${order.totalPrice}</Col>
                                
                            </Row>
                        </ListGroup.Item>

                    </ListGroup>
                </Card>
            </Col>
        </Row>
    </div>
)
}

export default OrderScreen

