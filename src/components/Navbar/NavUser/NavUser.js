
import React , {useContext} from 'react'
import {Link} from 'react-router-dom'
import './styles.scss'


import { Context } from '../../../contexts/auth'

export default function NavUser({userName, profile}) {
  const { handleLogout} = useContext(Context); 

  const handleLogOut=(e)=> {
    handleLogout(e)
  } 
  return (
    <>
    <ul className="navbar-nav align-items-center d-none d-md-flex">
      <li className="nav-item dropdown">
      <Link to="/#" className="nav-link pr-0" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <div className="media align-items-center">
        <span className="avatar avatar-sm rounded-circle">
        <img alt="profil" src={profile} />
        </span>
        <div className="media-body ml-2 d-none d-lg-block">
        <span className="mb-0 text-sm  font-weight-bold">{userName}</span>
        </div>
        </div>
      </Link>
      <div className="dropdown-menu dropdown-menu-arrow dropdown-menu-right">
      <div className=" dropdown-header noti-title">
  <h6 className="text-overflow m-0">Welcome! </h6>
      </div>
      <Link to="/profile" className="dropdown-item">
        <i className="ni ni-single-02"></i>
        <span> Pwofil </span>
      </Link>
      <Link to="/product/purchase" className="dropdown-item">
        <i className="ni ni-settings-gear-65"></i>
        <span> Acha </span>
      </Link>
      <div className="dropdown-divider"></div>
        <Link to="/#" className="dropdown-item" onClick={handleLogOut}>
          <i className="ni ni-user-run"></i>
          <span>Logout</span>
        </Link>
      </div>
      </li>
      </ul>
    </>
  )
}
