import React, {useState, useEffect} from 'react'
import Navbar from '../../components/Navbar/Navbar'
import './styles.scss'
import api from '../../services/api'
import { useHistory ,Redirect} from 'react-router-dom'

export const Categories = () => {

    const [categories, setCategories]= useState([]);
    const history = useHistory()
  
    useEffect(() => {
     
      const getCategories = async () => {
            try {
                const response = await api.get('products')

                let result = response.data
                if(result.message){
                    setCategories([])
                }else{
                    setCategories(result)
                }
                } catch (error) {
                console.log(error)
                }
            } 
            getCategories()
    }, [])


    return (
        <>
            <Navbar/>
            <div className="Master">
            
                <div className="moreFiltre" >
                    <h2>Enfomatik</h2>  

                    <h1>Filtre</h1>
                    <hr />

                    <div className="tout">
                    <p>Tout</p>
                    </div>
                    <div className="mwens_che"> 
                    <p>Mwens chè</p>
                    </div>
                    <div className="plis_vann">
                    <p>Plis vann</p>
                    </div>

                    <h3>Sou Kategori</h3>
                    <hr />

                    <ul>
                        <li>Tout</li>
                        <li>Alimantè</li>
                        <li>Enfòmatik</li>
                        <li>Vètman</li>
                        <li>Kosmetik</li>
                        <li>Netwayaj</li>
                        <li>Espo</li> 
                        <li>Edikasyon</li>
                        <li>Elektwomenaje</li> 
                        <li>Mèb</li> 
                        <li>Lòt</li>
                    </ul>

                </div>

            <div className="cardPart">

                <div className="result_part">
                    {categories.map(prod => (
                        <div className="card" >
                                <div className="first_part">
                                    <img src={prod.img} alt="" />
                                    <img src={prod.img2} className="show-hover" alt="" />
                                </div>
                                <div className="second_part">
                                        <p>{prod.name}</p>
                                        <p className="price">R$ <span> {prod.price}</span> </p>
                                                    
                                </div>
                        </div>
                    ))}
                </div>

                <div className="pagination">
                    <div></div>

                    <div className="paginationBtn">
                        <div className="navigBtn"> &#60; &#60; Avan </div>
                        <div  className="Actualpage"> 45 </div>
                        <div className="navigBtn"> Aprè &#62; &#62; </div>
                    </div>
                </div>
            </div>



           </div>
        </>
    )
}