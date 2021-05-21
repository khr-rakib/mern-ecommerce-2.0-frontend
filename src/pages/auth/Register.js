import React, { useEffect, useState } from 'react'
import { auth } from '../../firebase'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'

const Register = ({ history }) => {
    const [email, setEmail] = useState('')

    const user = useSelector(state => state.user)    
    useEffect(() => {
        if(user && user.token) return history.push('/')
    }, [user, history])

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            const config = {
                url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
                handleCodeInApp: true
            }
            await auth.sendSignInLinkToEmail(email, config)
            toast.success(`Email is sent to ${email}. Click the link to complete your registration.`)
            window.localStorage.setItem('emailForRegistration', email)
            setEmail('')
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    return (
        <div className='container mt-50'>
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h4>Register</h4>
                    <form onSubmit={handleSubmit}>
                        <input type="email" className='form-control' value={email} placeholder='Enter email address...' onChange={e => setEmail(e.target.value)} autoFocus />
                        <button type='submit' className='btn btn-raised'>Register</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register
