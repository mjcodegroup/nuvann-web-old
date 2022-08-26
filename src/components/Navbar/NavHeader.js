// import NavUser from './NavUser'
// import React , {useState} from 'react'


// import {FiSearch, FiShoppingCart,FiUser} from 'react-icons/fi'

// import {FaBars, FaFacebook, FaSearch, FaTwitter, FaYoutube} from 'react-icons/fa'

// import {Link} from 'react-router-dom'
// import logo from '../../assets/logoNuvann.png'

// import './styles.css'

// export default function NavHeader() {
//   const [isOpen, setIsOpen] = useState(false);

//   const handleToggle = () => setIsOpen(!isOpen);

//   return (
//     <>
//       <nav className="navbar navbar-expand-md navbar-light bg-light main-menu">
//   <div className="container">

//     <button type="button" id="sidebarCollapse" className="btn btn-link d-block d-md-none" onClick={handleToggle}>
//           <FaBars />
//             </button>

//     <Link className="nav-brand" to="/">
//       <img className="nav-brand" src={logo} alt="logo"/>
//     </Link>

//     <ul className="navbar-nav ml-auto d-block d-md-none">
//       <li className="nav-item">
//         <Link className="btn btn-link" to="/"><FiShoppingCart/> <span className="badge badge-danger">3</span></Link>
//       </li>
//     </ul>

//     <div className="collapse navbar-collapse">
//       <form className="form-inline my-2 my-lg-0 mx-auto">
//         <input className="form-control" type="search" placeholder="chèche yon pwodwi..." aria-label="Search" />
//         <button className="btn btn-primary my-2 my-sm-0" type="submit"><FiSearch /></button>
//       </form>

//       <ul className="navbar-nav">
//         <li className="nav-item">
//           <Link className="btn btn-link" to=""><FiShoppingCart/><span className="badge badge-danger">3</span></Link>
//         </li>
//         <li className="nav-item ml-md-3">
//           <Link className="btn btn-primary" to="">  <FiUser /> konekte | Enskri</Link>
//         </li>
//       </ul>
//     </div>

//   </div>
// </nav>
//     </>
//   )
// }
