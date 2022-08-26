import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import Footer from '../../components/Footer/Footer'
import Navbar from '../../components/Navbar/Navbar'
import api from '../../services/api';
import useFullPageLoader from '../../contexts/hooks/useFullPageLoader';
import './styles.scss'

export const ProductPurchase = () => {
    const [purchase, setPurchase] = useState([]);
    const [purchaseDetail, setPurchaseDetail] = useState([]);
  const [loader, showLoader, hideLoader] =useFullPageLoader()

    useEffect(() => {
        async function fectData() {
            showLoader()
            try {
                const response = await api.get('purchase')
                const result = response.data
                if(result.message) {
                    setPurchase([])
                    setPurchaseDetail([])
                    hideLoader()
                } else{
                    setPurchase(result)
                    setPurchaseDetail(result[0])
                    hideLoader()
                }
                
            } catch(error){
                console.log(error)
            }
        }
        fectData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleView =(product)=> {
        setPurchaseDetail(product)
    }
    return (
        <>
        {loader}
            <Navbar/>
            {[purchase.length].includes(0) || !loader?
                <div>
                        <div className = "AchasHolder2">
                            <div className="messageAnyen">
                                <h3>Ou poko achte anyen !!</h3>
                                <Link to="/#" > <button className="plispwodui"> Plis pwodui</button> </Link>

                            </div>
                        </div>

                </div>
            :
                <div className = "AchasHolder ">
                    <div className = "PurchaseCards">
                        <h3>Pwodwi ou achte deja</h3>
                        <div className="PurchaseScroll">
                            {purchase.map((pur, index)=> (
                                <div className = "ActualCard" key={pur.id}>
                                    <img src={pur.product.img} alt="product" />

                                    <div className ="CardstitleDate">
                                        <h4>{pur.product.name}</h4>
                                        <h5>Dat: <span>{pur.product.updated_at}</span> </h5>
                                        <h5>Estati: <span>{pur.status}</span> </h5>

                                    </div>

                                    <div className="CardsButtons">
                                        <button onClick={()=>handleView(pur)}>Wè plis</button> <br />
                                        <button className="Achtebtn">Achte ankò</button>

                                    </div>

                                </div>

                            ))}



                            
                        </div>
                    </div>
                    <div className= "purchaseMoreInfo">
                        <div className = "ShowInfo">
                            <img src={purchaseDetail.product.img} alt="" />
                            <div className = "line"></div>
                            <div className = "ActualInfoshow">
                                <div className="ShowInfodetails">
                                    <h3>Pwodui:</h3>
                                    <h4>{ purchaseDetail.product.name}</h4>
                                </div>
                                 <div className="ShowInfodetails">
                                    <h3>Kantite:</h3>
                                    <h4>{purchaseDetail.quantity    }</h4>
                                </div>
                                <div className="ShowInfodetails">
                                    <h3>Pri:</h3>
                                    <h4>R$ <span>{purchaseDetail.product.current_price || purchaseDetail.amount}</span> </h4>
                                </div>
                                <div className="ShowInfodetails">
                                    <h3>Vandè  :</h3>
                                    <h4>Damas Serius</h4>
                                </div>
                                <div className="ShowInfodetails">
                                    <h3>Dat    :</h3>
                                    <h4>{(purchaseDetail.product.updated_at).split(0, 5)}</h4>
                                </div>
                            </div>
                            <button className="Achtebtn">Achte ankò</button>
                        </div>
                    </div>
                </div>
            }
            <Footer />
        </>
    )
}
