import React , {useState,useContext, useEffect} from 'react'
import {Link, useHistory} from 'react-router-dom'

import { Context } from '../../contexts/auth'
// import {history} from '../../history';


import logo from '../../assets/logo.png'
import './styles.scss'
 
import {FiSearch, FiShoppingCart,FiUser} from 'react-icons/fi'

import {FaBars, FaSearch } from 'react-icons/fa'
import { BiChevronRight, BiLogOutCircle, BiChevronDown} from 'react-icons/bi'
import NavUser from './NavUser/NavUser'
import api from '../../services/api'

const Navbar=()=> {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => setIsOpen(!isOpen);
  const handleToggleClose = () =>setIsOpen(false);
  const {authenticated, user, handleLogout } = useContext(Context);
  const [count, setCount] = useState('')

  const history = useHistory();
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState([''])
  // const [selectedCategory, setSelectedCategory] = useState('0');
  // const [selectedCategoryLabel, setSelectedCategoryLabel] = useState('');

  const goToSellerPage = async()=> {
    if(authenticated){
      try {
        const userInfo = await api.get(`users/${user.id}`)
        const userData =  userInfo.data
        if (userData.term === 'N'){
          history.push('/sellerinfo')
          return
        }
        else {
          history.push('/seller')
        }
      } catch (erro) {
        console.log(erro)
      }
    }
    else {
      history.push('/login')
    }
    
  }

  useEffect(() => {
    
    const getTotal = async()=> {
        const request = await api.get(`cart`)
        setCount(request.data.length)
    }
    getTotal()
    
}, [count])
useEffect(() => {
  async function getCategory() {
      try {
              const response = await api.get('/category')
              setCategory(response.data)
          } catch (error){
              console.log(error)
          }
      }
      getCategory()
}, [])

const handleSearch= ()=> {
  if(search) {
    let text = search;

    // setSearch({search: " "})
    history.push({
      pathname: "/search",
      state: {
        setSearch: text
      }
    })

  }

}

const handleLogOut=(e)=> {
  handleLogout(e)
  setIsOpen(false)
} 

  return (

    <>
  <nav className="navbar navbar-expand-md navbar-light main-menu">
    <div className="container mobile__navbar">

      <button type="button" id="sidebarCollapse" className="btn btn-link d-block d-md-none" onClick={handleToggle}>
        <FaBars />
      </button>

      <Link className="nav-brand" to="/#">
        <img className="nav-brand" src={logo} alt="logo"/>
      </Link>

      <Link to="/#" className="navbar__mobile_brand">
        Nuvann
      </Link>

      <ul className="navbar-nav ml-auto d-block d-md-none">
        <li className="nav-item">
          <Link className="btn btn-link" to="/cart"><FiShoppingCart/><span className="badge badge-danger">{count}</span></Link>
        </li>
      </ul>

      <div className="collapse navbar-collapse">
        <form className="form-inline my-2 my-lg-0 mx-auto" onSubmit={handleSearch}>
          <input className="form-control" type="search" placeholder="Chèche yon pwodwi..." aria-label="Search"  value={search} onChange={e => setSearch(e.target.value)} />
          <button className="btn btn-primary my-2 my-sm-0" type="submit"><FiSearch /></button>
        </form>

        <ul className="navbar-nav">
            {authenticated ?
            <li>
              <NavUser userName={user.name} profile={user.profile}/>
            </li>
              :
              <li className="nav-item ml-md-3">
                <Link to="/login" className="btn btn-primary" >  <FiUser /> konekte | Enskri</Link>
              </li>
            }
          <li className="nav-item">
            <Link className="btn btn-link" to="/cart"><FiShoppingCart/><span className="badge badge-danger">{count}</span></Link>
          </li>
        </ul>
      </div>

    </div>
  </nav>

  <nav className="navbar navbar-expand-md navbar-light sub-menu">
    <div className="container-fluid">
      <div className= "collapse navbar-collapse" id="navbar">
        <ul className="navbar-nav mx-auto">
          <li className="nav-item active">
            <Link className="nav-link" to="/#">Prinsipal <span className="sr-only">(current)</span></Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/promotion">Pwomosyon</Link>
          </li>
      
          <li className="nav-item dropdown">
            <Link className="nav-link dropdown-toggle" to="/#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Kategori
            </Link>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              {category.map((cat, index)=> (
                <Link to="/categories"  className="dropdown-item" key={index}> {cat.name}</Link>
              ))}
            </div>
          </li>
          <li className="nav-item" onClick={goToSellerPage}>
            <Link className="nav-link" to="/#">Vann</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/#">kontak</Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <div className="search-bar mobile_search_bar d-block d-md-none">
    <div className="container">
      <div className="row">
        <div className="col-12">
          <form className="form-inline mb-3 mx-auto">
            <input className="form-control" type="search" placeholder="" aria-label="Search" />
            <button className="btn btn-primary" type="submit"><FaSearch/></button>
          </form>
        </div>
      </div>
    </div>
  </div>

  <nav id="sidebar" className={`${isOpen ? 'active' : ''} navbar-collapse`}>
    <div className="sidebar-header">
      <div className="container">
        <div className="row align-items-center">
          {authenticated ?
            <div className="col-10 pl-0">
              {/* <NavUser userName={user.name} profile={user.profile}/> */}
              <span className="sidebar_authenticated">
                <img src={user.profile} alt="profil"/>
                <p>{user.name}</p>
              </span>
            </div>
              :
            <div className="col-10 pl-0">
              <Link className="" to="/login"><FiUser /> Konekte | Enskri</Link>
            </div>
          }
          <div className="col-2 text-left">
            <button type="button" id="sidebarCollapseX" className="btn btn-link" onClick={handleToggleClose}>
              <BiChevronRight/>
            </button>
          </div>
        </div>
      </div>
    </div>

    <ul className="list-unstyled components links">
      {authenticated ?
      <div>
        <li className="nav-item">
          <Link to="/profile"><i className="bx bx-home mr-3"></i> Pwofil</Link>
        </li>
        <li>
          <Link to="/product/purchase"><i className="bx bx-carousel mr-3"></i> Acha</Link>
        </li>
      </div>
      :
        ''
      }
      <div className="dropdown-divider"></div>
      <li className="nav-item">
        <Link to="/#"><i className="bx bx-home mr-3"></i> Prensipal</Link>
      </li>
      <li>
        <Link to="/#"><i className="bx bx-carousel mr-3"></i> Pwomosyon</Link>
      </li>
      <a href="#submenu1"  data-toggle="collapse" aria-expanded="false" className="sidebar__dropdown text-white" button>
        <li>
          <Link to="/#"><i className="bx bx-carousel mr-3"></i> Kategori <span><BiChevronDown/></span></Link>
        </li>
      </a>
      <div id='submenu1' className="collapse sidenav__submenu">
        {category.map((cat, index)=> (
           <li className="nav-item" key={cat.id}>
            <Link to="/#"><i className="bx bx-carousel mr-3"></i>{cat.name}</Link>
          </li>
        ))}

      </div>
      <li>
        <Link to="/#"><i className="bx bx-phone mr-3"></i> Contact</Link>
      </li>
    </ul>
    <ul className="social-icons">
      
      <li ><Link to="/#"  target="_blank" onClick={handleLogOut}>Dekonekte <BiLogOutCircle size={30} color="blue"/> </Link></li>
    </ul>
  </nav>
      </>
    )
  }

export default Navbar;
