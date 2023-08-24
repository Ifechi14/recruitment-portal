import React from 'react'
import { useAppContext } from '../context/appContext';
import Wrapper from '../assets/wrappers/BigSidebar'
import NavLinks from './NavLinks';
import Logo from '../components/Logo';

const BigSidebar = () => {
  const { showSidebar } = useAppContext()
  return (
    <Wrapper>
      <div 
        className={
          showSidebar ? 'sidebar-container' : 'sidebar-container show-sidebar'
          }
      >
        <div className="content">
          <header>
            <Logo />
          </header>
          <NavLinks />
        </div>

          </div>
        <h1>Big sidebar</h1>
    </Wrapper>
  )
}

export default BigSidebar
