import React, {useState, useEffect} from 'react' 
import {Form, Button} from 'react-bootstrap'
import {useLocation, useNavigate } from 'react-router-dom'
import FormContainer from '../components/FormContainer.js'
import {useDispatch, useSelector} from 'react-redux'
import {saveShippingAddress} from '../actions/cartActions.js'

export default function ShippingScreen() {

    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart 

    const location = useLocation().search
    let navigate = useNavigate()

    const dispatch = useDispatch()

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({address, city, postalCode, country}))
        navigate('/payment')
    }

    return (
    <FormContainer>
        <h1>Shipping</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group controlId='address'>
                <Form.Label>Address</Form.Label>
                <Form.Control
                    required
                    type='text'
                    placeHolder='Enter Address'
                    value={address ? address : ''}
                    onChange={(e) => setAddress(e.target.value)}
                >
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='city'>
                <Form.Label>City</Form.Label>
                <Form.Control
                    required
                    type='text'
                    placeHolder='Enter City'
                    value={city ? city : ''}
                    onChange={(e) => setCity(e.target.value)}
                >
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='postalCode'>
                <Form.Label>Postal Code</Form.Label>
                <Form.Control
                    required
                    type='text'
                    placeHolder='Enter Postal Code'
                    value={postalCode ? postalCode : ''}
                    onChange={(e) => setPostalCode(e.target.value)}
                >
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='country'>
                <Form.Label>Country</Form.Label>
                <Form.Control
                    required
                    type='text'
                    placeHolder='Enter Country'
                    value={country ? country : ''}
                    onChange={(e) => setCountry(e.target.value)}
                >
                </Form.Control>
            </Form.Group>
            <br/>
            <Button type='submit' variant='primary'>
                Continue
            </Button>


        </Form>
    </FormContainer>
    )
}
