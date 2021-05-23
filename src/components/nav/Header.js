import React, { useState } from 'react'
import { Menu } from 'antd'
import { AppstoreOutlined, SettingOutlined, UserOutlined, UserAddOutlined, LogoutOutlined } from '@ant-design/icons'
import { Link, useHistory } from 'react-router-dom'
import firebase from 'firebase'
import { useDispatch, useSelector } from 'react-redux';

const { SubMenu } = Menu;

const Header = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)

    const history = useHistory()
    const [current, setCurrent] = useState('home')

    const handleClick = (e) => {
        setCurrent(e.key)
    }
    
    const handleLogout = () => {
        firebase.auth().signOut()
        dispatch({ type: 'LOGOUT', payload: null })
        history.push('/login')
    }

    return (
        <>
            <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
                <Menu.Item key="home" icon={<AppstoreOutlined />}>
                    <Link to="/">Home</Link>
                </Menu.Item>
                
                {!user && (<>
                    <Menu.Item key="register" icon={<UserAddOutlined />} className="float-right">
                        <Link to='/register'>Register</Link>
                    </Menu.Item>
                    <Menu.Item key="login" icon={<UserOutlined />} className="float-right">
                        <Link to='/login'>Login</Link>
                    </Menu.Item>    
                </>)}
                
                
                {user && (<>
                    <SubMenu key="SubMenu" icon={<SettingOutlined />} title={user.email && user.email.split('@')[0] } className='ms-auto'>
                        <Menu.Item key="setting:1">Option 1</Menu.Item>
                        <Menu.Item onClick={handleLogout} icon={<LogoutOutlined/>}>Logout</Menu.Item>
                    </SubMenu>
                </>)}
            </Menu>
        </>
    )
}

export default Header
