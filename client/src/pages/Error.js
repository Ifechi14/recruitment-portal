import React from 'react'
import { Link } from 'react-router-dom'
import img from '../assets/images/not-found.svg'
import Wrapper from '../assets/wrappers/ErrorPage'


const Error = () => {
    return (
        <Wrapper className='full-page'>
            <div>
                <img src={img} alt='error page' />
                <h3>Ohh! Page Not Found</h3>
                <p>We cant seem to find the page you're looking for</p>
                <Link to='/'>
                    Back Home
                </Link>
            </div>
        </Wrapper>
    )
}

export default Error