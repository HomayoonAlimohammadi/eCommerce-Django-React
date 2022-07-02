import React, {useState, useEffect} from 'react' 
import {Form, Button, Col} from 'react-bootstrap'
import {Navigate, useLocation, useNavigate } from 'react-router-dom'
import FormContainer from '../components/FormContainer.js'
import {useDispatch, useSelector} from 'react-redux'
import CheckoutSteps from '../components/CheckoutSteps.js'
import {savePaymentMethod} from '../actions/cartActions.js'


function PaymentScreen() {

    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart

    const dispatch = useDispatch() 
    const navigate = useNavigate()


    const [paymentMethod, setPaymentMethod] = useState('Paypal')

    if (!shippingAddress.address) {
        navigate('/shipping')
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeorder')
    }

  return (
    <FormContainer>
        <CheckoutSteps step1 step2 step3 />

        <Form onSubmit={submitHandler}>
            
            <Form.Group>
                <Form.Label as='legend'>Select Method</Form.Label>
                <Col>
                    <Form.Check 
                        type='radio'
                        label='Paypal or Credit Cart'
                        id='paypal'
                        name='paymentMethod'
                        checked
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    >

                    </Form.Check>
                </Col>
            </Form.Group>
            <br/>
            <Button variant='primary' type='submit'>Continue</Button>
        </Form>
    </FormContainer>
  )
}

export default PaymentScreen