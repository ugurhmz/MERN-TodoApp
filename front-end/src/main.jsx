import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import { 
  createBrowserRouter ,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'
import store from './store.js'
import { Provider  } from 'react-redux'
import './index.css'
import { ToastProvider } from 'react-toast-notifications'; 
import HomePage from './pages/HomePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'

const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element = { <App/>}>
        <Route              path='/login'  element={<LoginPage/>}/>
        <Route              path='/register'  element={<RegisterPage/>}/>
      </Route>
    )
) 


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    
      <ToastProvider>
        <RouterProvider router={router} />
      </ToastProvider>
    
  </Provider>
  
)
