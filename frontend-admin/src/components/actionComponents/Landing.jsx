import React from 'react'
import {useAuth0} from '@auth0/auth0-react'
import '../styles/landing.css'

function Landing() {

    const {loginWithRedirect} = useAuth0()

    return (
        <div className='landing_container'>
            <div className='column_left'>
                <h1 className='welcome'>Bienvenido</h1>
                <button className='btn_login' onClick={() => loginWithRedirect()}>Login</button>
            </div>
            <div className='column_right'>
           
            </div>
        </div>
    )
}

export default Landing
