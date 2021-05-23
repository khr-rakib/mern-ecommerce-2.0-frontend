import React, { useEffect } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import Header from './components/nav/Header'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import RegisterComplete from './pages/auth/RegisterComplete'
import Home from './pages/Home'

import { auth } from './firebase';
import { useDispatch } from 'react-redux';
import ForgotPassword from './pages/auth/ForgotPassword'
import { currentUser } from './functions/authFunc'
import History from './pages/user/History'
import UserRoute from './components/routes/UserRoute'
import Password from './pages/user/Password'
import Wishlist from './pages/user/Wishlist'


const App = () => {
  const dispatch = useDispatch()

  // to check firebase auth state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        currentUser(idTokenResult.token)
          .then(res => {
              dispatch({
                  type: 'LOGGED_IN_USER',
                  payload: {
                      name: res.data.name,
                      email: res.data.email,
                      token: idTokenResult.token,
                      role: res.data.role,
                      _id: res.data._id
                  }
              })
          })        
      }
    })
    return () => unsubscribe()
  }, [dispatch])


  return (
    <>
      <BrowserRouter>
        <Header/>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/register/complete' component={RegisterComplete} />
          <Route exact path='/forgot/password' component={ForgotPassword} />
          <UserRoute exact path='/user/history' component={History} />
          <UserRoute exact path='/user/password' component={Password} />
          <UserRoute exact path='/user/wishlist' component={Wishlist} />
          
        </Switch>
      </BrowserRouter>
      <ToastContainer/>
    </>
  )
}

export default App
