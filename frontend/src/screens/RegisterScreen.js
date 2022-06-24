import React, {useState, useEffect} from 'react' 
import {Form, Button, Row, Col} from 'react-bootstrap'
import {Link, useLocation, useNavigate } from 'react-router-dom'
import Loader from '../components/Loader.js'
import Message from '../components/Message.js'
import FormContainer from '../components/FormContainer.js'
import {useDispatch, useSelector} from 'react-redux'
import {register} from '../actions/userActions.js'



function RegisterScreen() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const location = useLocation().search
    let navigate = useNavigate()
    const redirect = location ? location.split('=')[1] : '/'
    const dispatch = useDispatch()

    const userRegister = useSelector(state => state.userRegister)
    const {error, loading, userInfo} = userRegister

    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [navigate, userInfo, redirect])


    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage('Password do not match.')
        } else {
            dispatch(register(name, email, password))
        }
    }

    return (
        <FormContainer>
            <h1>
                Register
            </h1>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>

                <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        required
                        type='name'
                        placeHolder='Enter Name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        required
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
                        required
                        type='password'
                        placeHolder='Enter Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='passwordConfirm'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        required
                        type='password'
                        placeHolder='Confirm Password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <br></br>
                <Button type='submit' variant='primary'>Register</Button>

            </Form>

            <Row className='py-3'>
                <Col>
                    Have an account? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                        Sign In.
                        </Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default RegisterScreen
