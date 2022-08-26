import React, {useEffect, useState} from 'react'
import Footer from '../../components/Footer/Footer'
import Navbar from '../../components/Navbar/Navbar'

import {Link, useLocation, useHistory} from 'react-router-dom'


import './styles.scss'
import api from '../../services/api'

export default function Search() {
    const [searchResults, setSearchResults] = useState([])

    const location = useLocation();
    const history = useHistory();
   
console.log(location.state.setSearch)

    useEffect(() => {
       async function handleSearch() {
           const searchTo = location.state.setSearch
           try {
               const result = await api.get(`main/search?value=${searchTo}`)
               const response = result.data
               if (result.data.message) {
                   setSearchResults([])
               } else {
                   setSearchResults(response)
               }
           } catch(error) {
               console.log(error)
           }
       }
       handleSearch()
    }, [])

    return (
        <>
        <Navbar />
                <div className="search">
                    <div className="filter">
                       <h2 className = "filtre">Filtre</h2> 
                        <hr />

                        <div className="tout_button btn">Tout </div>
                        <div className="other_button btn2">Plis vann</div>
                        <div className="other_button btn2">Mwens chè</div>
                        <div className="other_button btn2">Nouvote</div>
                        <div className="other_button btn2">Plis vann</div>
                        <div className="other_button btn2">Itilize deja</div>
                        <div className="other_button btn2">Plis diskont</div>
                    </div>
                    <div className="products">
                        <div className="top_part">
                            <div>
                              <h2>  Rezilta pou: <span> " {location.state.setSearch} " </span></h2>
                            </div>
                            <div>
                                {searchResults.length} rezilta | Paj 1
                            </div>
                        </div>
                        {searchResults.length <=0 ?
                        <p className="text-center text-danger"> pwodui sa pa disponib</p>
                        :
                        <div className="prod_part">
                            {searchResults.map((prod, index)=> (
                                <div className="card" onClick={()=>history.push(`api/products/${prod.id}`)} key={prod.id}>
                                    <div className="first_part">
                                        <img src={prod.img2} alt="" />
                                        <img src={prod.img} className="show-hover" alt="" />
                                    </div>
                                    <div className="second_part">
                                        <p>{prod.name.length > 18 ? prod.name.substring(0,18)+'...' : prod.name}</p>
                                        <p className="price">R$ <span> {prod.price} </span> </p>
                                        
                                    </div>
                                </div>
                            ))}
                        </div>  
                            
                        }
                        


                    </div>

                </div>
        </>
    )
}
