import React from 'react'
import NavigationBar from './components/NavigationBar'
import { Outlet } from 'react-router-dom'
import { Container } from 'react-bootstrap'


const App = () => {
  return (
    <>
      <NavigationBar/>
      <Container className='my-5'>
        <Outlet/>
      </Container>
    </>
  )
}

export default App