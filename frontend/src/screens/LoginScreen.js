import React, {useState, useEffect} from 'react' 
import {Form, Button, Row, Col} from 'react-bootstrap'
import {Link, useLocation, useNavigate } from 'react-router-dom'
import Loader from '../components/Loader.js'
import Message from '../components/Message.js'
import FormContainer from '../components/FormContainer.js'
import {useDispatch, useSelector} from 'react-redux'
import {login} from '../actions/userActions.js'


function LoginScreen() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const location = useLocation().search
    let navigate = useNavigate()
    const redirect = location ? location.split('=')[1] : '/'
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const {error, loading, userInfo} = userLogin

    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [navigate, userInfo, redirect])


    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }

    return (
        <FormContainer>
            <h1>
                Sign In
            </h1>

            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>

                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type='email'
                        placeHolder='Enter Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeHolder='Enter Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <br></br>
                <Button type='submit' variant='primary'>Sign In</Button>

            </Form>

            <Row className='py-3'>
                <Col>
                    New Customer? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                        Register
                        </Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default LoginScreen