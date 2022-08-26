import React, {useState, useEffect} from 'react'
import Navbar from '../../components/Navbar/Navbar'
import './styles.scss'
import api from '../../services/api'
import { useHistory} from 'react-router-dom'
import useFullPageLoader from '../../contexts/hooks/useFullPageLoader';

export const Promotion = () => {
  const [promotion, setPromotion]= useState([]);
  const history = useHistory()

  const [loader, showLoader, hideLoader] =useFullPageLoader()


  useEffect(() => {
    showLoader()
   
    const getPromotion = async () => {
    try {
        const response = await api.get('products/prods/promotion')
        setPromotion(response.data)
        hideLoader()
      } catch (error) {
        console.log(error)
      }
    } 
    getPromotion()
  }, [])
  return (
    <>
            {loader}
            
      <Navbar/>

         <div className="promotions">
            <div className="left_side">
              <div className = "first_child">
                  <h2>Pwomosyon</h2>  

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

                  <h3>Kategori</h3>
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

            </div>


              <div className="right_side__promotion">
                <div className="sub_right">
               {promotion.map((promo)=> (
                    <div className="card_1" key={promo.id} onClick={()=>history.push(`api/products/${promo.id}`)}>
                      <div className="product_img">
                        <img src={promo.img} alt="" />
                        <img src={promo.img2} className="show-hover" alt="" />
                      </div>

                      <h2>{promo.name}</h2>
  
                      <div className="bottom">
                        <i>de <span className="lastprice"> {promo.price}</span></i>
                        <p>R$ {promo.current_price}  </p>
                      </div>
                    </div> 
                  ))}
                </div>
              </div>


         </div>

      {/*<Footer />*/}                                                                                                    
    </>
  )
}
