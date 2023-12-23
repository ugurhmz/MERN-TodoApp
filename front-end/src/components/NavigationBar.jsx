
import React from 'react'
import {Navbar, Nav, Container, NavDropdown, Badge} from 'react-bootstrap'
import {FaSignInAlt, FaSignOutAlt} from 'react-icons/fa'
import { useSelector, useDispatch} from  'react-redux'
import { LinkContainer } from 'react-router-bootstrap'


const NavigationBar = () => {

    const { userInfo } = useSelector( (state) => state.auth);

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
                            { userInfo ? (
                                <>
                                    <NavDropdown title={userInfo.user.userName}>
                                        <LinkContainer to='/logout'>
                                            <NavDropdown.Item>
                                                Logout
                                            </NavDropdown.Item>
                                        </LinkContainer>
                                    </NavDropdown>
                                </>

                            ):(
                                <>
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
                                </>
                            )  

                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
  )
}

export default NavigationBar