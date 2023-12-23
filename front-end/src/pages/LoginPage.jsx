import React from 'react'
import { useState, useEffect  } from 'react'
import { Link , useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button, Row, Col } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { useLoginMutation } from '../slices/usersApiSlice'
import { setCredentials } from '../slices/authSlice'
import { useToasts } from 'react-toast-notifications';

const LoginPage = () => {

    const [userMail, setUserEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [ login, {isLoading}] = useLoginMutation()
    const { userInfo } = useSelector((state) => state.auth)
    const { addToast } = useToasts();

    useEffect(() => {
        if(userInfo) {
            console.log("userInfo",userInfo)
            navigate('/')
        }
    }, [navigate, userInfo])

    const formSubmitHandler = async (e) => {
        e.preventDefault();
        try {
          const res = await login({ userMail, password }).unwrap()
          console.log("MYRESSSSSS", res)
            dispatch(setCredentials({ ...res}));
            navigate('/');
        } catch (err) {
          addToast(err?.data?.error || 'Bir hata oluştu!', { appearance: 'error', autoDismiss: true, autoDismissTimeout: 2500});
        }
      };
      
  return (
    <FormContainer>
        <h2>Login and Create Todo</h2>
        <Form onSubmit={ formSubmitHandler } className='mt-3'>

            {/** Email Input */}
            <Form.Group className='my-2 ' controlId='email'>
                <Form.Label>E-mail adress </Form.Label>
                <Form.Control
                    type='email'
                    placeholder='Enter email'
                    value={userMail}
                    onChange={ (e) => setUserEmail(e.target.value)}>
                </Form.Control>
            </Form.Group>

            {/** Password Input */}
            <Form.Group className='my-2' controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type='password'
                    placeholder='Enter password'
                    value={password}
                    onChange={ (e) => setPassword(e.target.value)}>
                </Form.Control>
            </Form.Group>

             {/** Login Button */}
            <Button type='submit' variant='primary' className='mt-4'>
                Login
            </Button>

            {/** Register  */}
            <Row className='py-3'>
                <Col >
                    If you don't have an account, <Link to='/register'>Register now.</Link>
                </Col>
            </Row>

        </Form>
       
    </FormContainer>
  )
}

export default LoginPage