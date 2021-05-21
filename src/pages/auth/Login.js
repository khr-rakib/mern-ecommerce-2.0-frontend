import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { auth, googleAuthProvider } from '../../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'antd'
import { GoogleOutlined, MailOutlined } from '@ant-design/icons'
import {createOrUpdateUser} from '../../functions/authFunc'

const Login = ({ history }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch()

    const user = useSelector(state => state.user)    
    useEffect(() => {
        if(user && user.token) return history.push('/')
    }, [user, history])

    const roleBaseRedirect = (res) => {
        if (res.data.role === 'admin') {
            history.push('/admin/dashboard')
        } else {
            history.push('/user/history')
        }
    }

    const handleSubmit = async e => {
        e.preventDefault()
        setLoading(true)
        try {            
            const userData = await auth.signInWithEmailAndPassword(email, password)
            const idTokenResult = await userData.user.getIdTokenResult()
            createOrUpdateUser(idTokenResult.token)
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
                    roleBaseRedirect(res)
                })
        } catch (error) {
            console.log(error)
            setLoading(false)
            toast.error(error.message)
        }
    }

    const handleGoogleLogin = async () => {
        try {
            const userData = await auth.signInWithPopup(googleAuthProvider)
            const idTokenResult = await userData.user.getIdTokenResult()
            
            createOrUpdateUser(idTokenResult.token)
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
                    roleBaseRedirect(res)
                })
        } catch (error) {
            console.log(error)
            setLoading(false)
            toast.error(error.message)
        }
    }


    return (
        <div className='container mt-50'>
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    {!loading ? <h4>Login</h4> : <h4>Loading...</h4>}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input type="email" className='form-control' value={email} placeholder='Enter email address...' onChange={e => setEmail(e.target.value)} autoFocus />
                        </div>
                        <div className="form-group">
                            <input type="password" className='form-control' value={password} placeholder='Enter password' onChange={e => setPassword(e.target.value)} />
                        </div>

                        <br />
                        <Button onClick={handleSubmit} type="primary" shape='round' className='btn-block' disabled={!email || password.length < 6}>
                            <MailOutlined /> Login with Email/Password
                        </Button>
                        <Button onClick={handleGoogleLogin} type="danger" shape='round' className='btn-block' >
                            <GoogleOutlined /> Login with Google
                        </Button>
                        <br />
                        <Link to='/forgot/password' className='float-right text-danger'>Forgot password?</Link>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
