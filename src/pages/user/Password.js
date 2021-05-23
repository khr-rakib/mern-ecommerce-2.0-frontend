import React, { useState } from 'react'
import UserNav from '../../components/nav/UserNav'
import { auth } from '../../firebase'
import { toast } from 'react-toastify'


const Password = () => {
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async e => {
        e.preventDefault()
        setLoading(true)

        try {
            await auth.currentUser.updatePassword(password)
            toast.success('Password updated')
            setPassword('')
            setLoading(false)            
        } catch (error) {
            setLoading(false)
            toast.error(error.message)
        }
    }

    return (
        <div className='container-fluid'>
            <div className="row">
                <div className="col-md-2">
                    <UserNav />
                </div>
                <div className="col">
                    {loading ? <h4>Loading...</h4> : <h4>Password Update</h4>}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="" className="form-label">Password</label>
                            <input type="password" onChange={e => setPassword(e.target.value)} value={password} placeholder='Enter new password' className='form-control' disabled={loading} />
                        </div>
                        <button className="btn btn-primary" disabled={!password || loading }>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Password
