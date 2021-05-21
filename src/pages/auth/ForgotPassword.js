import React, { useEffect, useState } from 'react'
import { auth } from '../../firebase'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux';

const ForgotPassword = ({ history }) => {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)

    const user = useSelector(state => state.user)
    
    useEffect(() => {
        if(user && user.token) return history.push('/')
    }, [user, history])

    const handleSubmit = async e => {
        e.preventDefault()
        setLoading(true)
        try {
            const config = {
                url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT_URL,
                handleCodeInApp: true
            }
            await auth.sendPasswordResetEmail(email, config)
            toast.info(`Reset link has been sent to ${email}`)
            setEmail('')
            history.push('/')
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
                    {loading ? <h4>Loading...</h4> : <h4>Forgot Password</h4> }
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input type="email" value={email} placeholder="Enter email address..." className="form-control" onChange={e => setEmail(e.target.value)} autoFocus />
                        </div>
                        <button className='btn btn-raised' disabled={!email}>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword
