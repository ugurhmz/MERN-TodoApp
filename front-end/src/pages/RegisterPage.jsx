import React from 'react'
import { useState, useEffect  } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { useDispatch, useSelector } from 'react-redux'
import { useToasts } from 'react-toast-notifications';
import Loader from '../components/Loader'
import { useRegisterMutation } from '../slices/usersApiSlice'
import { setCredentials } from '../slices/authSlice'

const RegisterPage = () => {

    const [userMail, setUsermail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [userName, setUserName] = useState('')
    const { addToast } = useToasts();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { userInfo } = useSelector( (state) => state.auth)
    const [register, {isLoading}] = useRegisterMutation();

    useEffect(() => {
        if(userInfo) {
           navigate('/')
        }
    }, [navigate,userInfo])

    const formSubmitHandler = async (e) => {
        e.preventDefault();
    
        if (!userMail || !password || !confirmPassword || !userName) {
            addToast("Fill in all fields!", { appearance: 'error', autoDismiss: true });
        } else if (password !== confirmPassword) {
            addToast("Passwords do not match!", { appearance: 'error', autoDismiss: true });
        } else {
            try {
                const res = await register({ userMail, userName, password }).unwrap();
                dispatch(setCredentials({ ...res.data }));
                navigate('/');
            } catch (err) {
                addToast(err?.data?.error || 'Bir hata oluştu!', {
                    appearance: 'error',
                    autoDismiss: true,
                    autoDismissTimeout: 2500,
                });
            }
        }
    };
    

  return (
    <FormContainer>
        <h2>Register</h2>
        <Form onSubmit={ formSubmitHandler } className='mt-3'>

           {/** User name */}
           <Form.Group className='my-2 ' controlId='fullName'>
                <Form.Label>Full name </Form.Label>
                <Form.Control
                    type='text'
                    value={userName}
                    onChange={ (e) => setUserName(e.target.value)}>
                </Form.Control>
            </Form.Group>

            {/** Email Input */}
            <Form.Group className='my-2 ' controlId='email'>
                <Form.Label>E-mail adress </Form.Label>
                <Form.Control
                    type='email'
                    placeholder='@'
                    value={userMail}
                    onChange={ (e) => setUsermail(e.target.value)}>
                </Form.Control>
            </Form.Group>

            {/** Password Input */}
            <Form.Group className='my-2' controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type='password'
                    value={password}
                    onChange={ (e) => setPassword(e.target.value)}>
                </Form.Control>
            </Form.Group>

            {/**Confirm Password Input */}
            <Form.Group className='my-2' controlId='confirmPassword'>
                <Form.Label>Confirm password</Form.Label>
                <Form.Control
                    type='password'
                    value={confirmPassword}
                    onChange={ (e) => setConfirmPassword(e.target.value)}>
                </Form.Control>
            </Form.Group>

            { isLoading && <Loader/>}
             {/** Login Button */}
            <Button type='submit' variant='success' className='mt-4'>
                Register
            </Button>

            {/** Register  */}
            <Row className='py-3'>
                <Col >
                    if you are already registered, <Link to='/login'> Login </Link>
                </Col>
            </Row>

        </Form>
    </FormContainer>
  )
}

export default RegisterPage