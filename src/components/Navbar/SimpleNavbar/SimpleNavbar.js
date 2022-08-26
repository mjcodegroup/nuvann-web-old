import React from 'react'
import {Link} from 'react-router-dom'
import NavUser from '../NavUser/NavUser'

import logo from '../../../assets/logo.png'
import './styles.scss'

export const SimpleNavbar = () => {
    const profile = JSON.parse(localStorage.getItem(('user')))
    return (
        <div>
            <nav className="navbar navbar-expand-md navbar-light main-menu navbar_simple fixed-top">
                <div className="container nav__simple_container">

                    <div className="nav__simple_logo">
                        <Link className="nav-brand" to="/#">
                            <img className="nav-brand" src={logo} alt="logo"/>
                        </Link>
                    </div>

                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav">
                            <li>
                            <NavUser  profile={profile.profile}/>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

        </div>
    )
}
