import React from "react";
import { useRoute, Link } from "wouter";

import useUser from "hooks/useUser";

import './index.css'

export default function Header () {
    const {isLogged, logout} = useUser()
    const [match] = useRoute('/Login');
    console.log(match)
    const handleClick = e => {
        e.preventDefault()
        logout()
    }

    const renderLoginbuttons = ({isLogged}) => {
        return isLogged
            ? <Link href='#' onClick={handleClick}>
                Logout
            </Link>
            : <>
            <Link to = '/login'>
                Login
            </Link>
            <Link to = '/register'>
                Register
            </Link>
            </>
    }

    const content = match 
    ? null 
    : renderLoginbuttons({isLogged})
            

    return (
        <header className='gf-header'>
            {content}
        </header>  
    )
}