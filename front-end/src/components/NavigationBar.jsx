
import React from 'react'
import {Navbar, Nav, Container} from 'react-bootstrap'
import {FaSignInAlt, FaSignOutAlt} from 'react-icons/fa'
import { LinkContainer } from 'react-router-bootstrap'


const NavigationBar = () => {
  return (
        <header>
            <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand href='/'>Todo App</Navbar.Brand>
                    </LinkContainer>
                  
                    <Navbar.Toggle aria-controls='basic-navbar-nav'/>
                    <Navbar.Collapse id='basic-navbar-nav'>
                            <Nav className='ms-auto'>
                                    <LinkContainer to='/login'>
                                        <Nav.Link>
                                            <FaSignInAlt/>Login                        
                                        </Nav.Link>
                                    </LinkContainer>

                                    <LinkContainer to='/register'>
                                        <Nav.Link >
                                            <FaSignOutAlt/>Register                        
                                        </Nav.Link>
                                    </LinkContainer>
                            </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
  )
}

export default NavigationBar