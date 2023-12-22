import React from 'react'
import { useState  } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'


const RegisterPage = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [fullName, setFullName] = useState('')

    const formSubmitHandler = async (e) => {
        e.preventDefault()
        console.log("Submit form")
    }

  return (
    <FormContainer>
        <h2>Register</h2>
        <Form onSubmit={ formSubmitHandler } className='mt-3'>

           {/** User name */}
           <Form.Group className='my-2 ' controlId='fullName'>
                <Form.Label>Full name </Form.Label>
                <Form.Control
                    type='text'
                    value={fullName}
                    onChange={ (e) => setFullName(e.target.value)}>
                </Form.Control>
            </Form.Group>

            {/** Email Input */}
            <Form.Group className='my-2 ' controlId='email'>
                <Form.Label>E-mail adress </Form.Label>
                <Form.Control
                    type='email'
                    placeholder='@'
                    value={email}
                    onChange={ (e) => setEmail(e.target.value)}>
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