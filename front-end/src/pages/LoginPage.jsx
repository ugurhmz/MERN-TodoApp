import React from 'react'
import { useState  } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'


const LoginPage = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const formSubmitHandler = async (e) => {
        e.preventDefault()
        console.log("Submit form")
    }

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
                    value={email}
                    onChange={ (e) => setEmail(e.target.value)}>
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