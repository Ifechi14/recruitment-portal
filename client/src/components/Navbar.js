import React, { useState } from 'react'
import Wrapper from '../assets/wrappers/Navbar'

import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa'
import Logo from './Logo'
import { useAppContext } from '../context/appContext'


const Navbar = () => {
    const [showLogout, setShowLogoOut] = useState(false);
    const {user, logoutUser, toggleSidebar} = useAppContext()
  return (
    <Wrapper>
        <div className="nav-center">
            <button 
                type='button'
                className='toggle-btn' 
                onClick={toggleSidebar}
            >
                <FaAlignLeft />
            </button>

            <div>
                <Logo />
                <h3 className='logo-text'>
                    Dashboard
                </h3>
            </div>

            <div className="btn-container">
                <button 
                    type='button' 
                    className='btn'
                    onClick={()=> setShowLogoOut(!showLogout)}
                >
                    <FaUserCircle />
                        {user.name}
                    <FaCaretDown />
                </button>

                <div className={showLogout ? "dropdown show-dropdown" : "dropdown"}>
                    <button 
                        type='button' 
                        className='dropdown-btn'
                        onClick={logoutUser}
                    >
                        logout
                    </button>
                </div>
            </div>
        </div>
    </Wrapper>
  )
}

export default Navbar
