import React, { useEffect, useState } from 'react'
import { auth } from '../../firebase'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'


const RegisterComplete = ({ history }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    const user = useSelector(state => state.user)    
    
    useEffect(() => {
        setEmail(window.localStorage.getItem('emailForRegistration'))
        if(user && user.token) return history.push('/')
    }, [history, user])

    const handleSubmit = async e => {
        e.preventDefault()
        // validation
        if (!email || !password) return toast.error('Email & password is required')        
        if(password.length < 6) return toast.error('Password must be at least 6 characters long')

        try {
            const result = await auth.signInWithEmailLink(email, window.location.href)
            if (result.user.emailVerified) {
                window.localStorage.removeItem('emailForRegistration')
                let user = auth.currentUser
                await user.updatePassword(password)
                const idTokenResult = await user.getIdTokenResult()
                // redux store
                dispatch({ type: 'LOGGED_IN_USER', payload: { email: user.email, idTokenResult: idTokenResult.token } })
                // redirect
                history.push('/')
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }


    return (
        <div className='container mt-50'>
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h4>Register Complete</h4>
                    <form onSubmit={handleSubmit}>
                        <input type="email" className='form-control' value={email} placeholder='Enter email address...' onChange={e => console.log(e.target.value)} />

                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="enter password" className="form-control" autoFocus />

                        <br />

                        <button type='submit' className='btn btn-raised'>Register Complete</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default RegisterComplete
