
import React, { useEffect } from 'react'
import {Navbar, Nav, Container, NavDropdown, Badge} from 'react-bootstrap'
import {FaSignInAlt, FaSignOutAlt} from 'react-icons/fa'
import { useSelector, useDispatch} from  'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useLogoutMutation } from '../slices/usersApiSlice'
import { logout } from '../slices/authSlice'



const NavigationBar = () => {

    const { userInfo } = useSelector( (state) => state.auth);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [logoutApiRequest] = useLogoutMutation()
  

    const logoutClickHandle = async () => {
       
        try {
           const res = await logoutApiRequest().unwrap()
       
            dispatch(logout())
            navigate('/')
        } catch(err) {
            if (err.data &&  err.data.logout) {
                dispatch(logout())
                navigate('/')
             return;
            } 
         
        }
    }

  return (
        <header>
            <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
                <Container>
                    <LinkContainer to='/login'>
                        <Nav.Link>
                            <Navbar.Brand>Todo App</Navbar.Brand>
                        </Nav.Link>
                    </LinkContainer>
                                        
                    <Navbar.Toggle aria-controls='basic-navbar-nav'/>
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className='ms-auto'>
                            { userInfo ? (
                                <>
                                    <NavDropdown title={userInfo.user.userName}>
                                      
                                            <NavDropdown.Item onClick={logoutClickHandle}>
                                                Logout
                                            </NavDropdown.Item>
                                        
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