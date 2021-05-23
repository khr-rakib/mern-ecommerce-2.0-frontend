import React from 'react'
import { useSelector } from 'react-redux'
import LodingToRedirect from './LodingToRedirect'
import { Route, Redirect } from 'react-router-dom'


const UserRoute = ({ children, ...rest }) => {
    const user = useSelector(state => state.user)

    return user && user.token ? (
        <Route
            {...rest}
            render={() => (children)}
        />
    ) : (<LodingToRedirect />)
}

export default UserRoute
