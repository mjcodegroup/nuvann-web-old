import React, {useEffect, useState, useContext} from 'react'

import {Link, useHistory} from 'react-router-dom'

import Title from '../../components/Title/Title'
import api from '../../services/api'
import './detail.scss'


import InputQuantity from '../../components/InputQuantity/InputQuantity'
import { FaOpencart } from 'react-icons/fa'
import Swal from 'sweetalert2'

import { Context } from '../../contexts/auth'

// import useFullPageLoader from '../../contexts/hooks/useFullPageLoader'

export const ProductDetailDescription = (props) => {
    const [product, setProduct] = useState(props.detailProd)
    const [productSize, setProductSize]= useState([])
    const [productCor, setProductCor]= useState([])
    const [inputQty, setInputQty] = useState(1)

    const [selectedSize, setSelectedSize] = useState([])
    const [selectedCor, setSelectedCor] = useState([])

    const [errorMessage, setErrorMessage] = useState('')

    const [sizeAction, setSizeAction] = useState('')
    const [corAction,setCorAction] = useState('')


    const [sizeSelect, setSizeSelect] = useState('')
    const [corSelect, setCorSelect] = useState('')

    const history = useHistory();

    const [getSeller, setSetSeller] = useState([])
    
    const [shippingCEP, setShippingCEP] = useState('')
    const [shippingAddress, setShippingAddress] = useState([])
    const [selectedShipping, setSelectedShipping] = useState('')

    useEffect(() => {
     
        const fetchData = async()=> {
            setProduct(props.detailProd)

            const objectToArray = async function(product) {
              
                var _arr = [];
            
                for (var key in product) {
                    _arr.push(product[key]);
                }
                const arrProd = _arr.filter(i=> i.productSize !== '')
                setProductSize(arrProd)
            }
            const objectCor = async function(product) {
                var _arr = [];
            
                for (var key in product) {
                    _arr.push(product[key]);
                }
                const arrProd = _arr.filter(i=> i.productCorQuantity !== '')
                setProductCor(arrProd)
                return _arr;
            }
            const getReseller = async function(product) {
                var _arr = []
                for (var key in product) {
                    _arr.push(product[key]);
                }
                setSetSeller(_arr)
                return _arr;
            }
            getReseller(props.detailProd.reseller)
            objectToArray(props.detailProd.size)
            objectCor(props.detailProd.color)
        }
        const inpeachContinue = async(product)=>{
            let proAmount = product.amount
            if(proAmount<1) {
         setErrorMessage(`Pwodui sa pa gen estòk disponib`)
            } 
        }
        inpeachContinue(props.detailProd)
        fetchData()
    }, [props.detailProd])


    const addToCart = async () => {
        let description = {
            color: selectedCor,
            size: selectedSize
        }
        const data = {
            id: product.id,
            quantity: inputQty,
            description
        }
                try{
                    const response = await  api.post(`cart/add`, data)
                    const message = response.data.message
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: message,
                        showConfirmButton: false,
                        timer: 2500
                    })
       
               setTimeout(function(){
                   history.push('/cart')
               }, 3000);
                }
                catch(error) {
                    const message = error.response.data.message
                    Swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title: message,
                        showConfirmButton: false,
                        timer: 2000
                    })
                }
    }

    const getProductSize = (size, changeSize) => {
        setSizeSelect(changeSize)
        let action = localStorage.getItem('action')
        if( !action) {
            setSelectedSize(size)
            localStorage.setItem('action', 'Y')
            setSizeAction(localStorage.getItem('action'))
            
        } else {
            localStorage.removeItem('action')
            setSelectedSize(size)
            setSizeAction('')
        }
    }

    const getProductCor = (cor, changeCor) => {
        setCorSelect(changeCor)
        let action = localStorage.getItem('corAction')
        setSelectedCor(cor)
        if( !action) {
            localStorage.setItem('corAction', 'Y')
            setCorAction(localStorage.getItem('corAction'))
            
        } else {
            setSelectedCor(cor)
            localStorage.removeItem('corAction')
            setCorAction('')
        }
    }

    const incrementButton =()=>{
        if (selectedSize.productQuantity < inputQty || props.detailProd.amount<= inputQty){
            setErrorMessage(`kantite maksimòm: ${selectedSize.productQuantity || props.detailProd.amount}`)
        } else{
            setInputQty(inputQty + 1)
            setErrorMessage('')
        }
    }
    const decrementButton =()=>{
        if (inputQty >1){
            setInputQty(inputQty - 1)
            setErrorMessage('')
            
        } else {
            setErrorMessage('')
            if (selectedSize.productQuantity < inputQty || props.detailProd.amount <= inputQty){
                setErrorMessage('')
            } else {
                setErrorMessage(`kantite maksimòm: ${selectedSize.productQuantity || props.detailProd.amount}`)
            } 
            setErrorMessage('')
        }
    }
    const purchaseTot = parseInt(inputQty) * parseFloat(props.detailProd.price)
    const handlePurchase =()=> {
        const setProduct = [{
            id:  product.id,
            name: product.name,
            price: product.price,
            color: selectedCor.productCor,
            size: selectedSize.productSize,
            img: product.img,
            quantity: inputQty,
            purchase_total: (purchaseTot).toFixed(2)
        }]
        localStorage.setItem('where', 'detail')
        localStorage.setItem('purchase_detail', JSON.stringify(setProduct))

        history.push('/purchase')
    }

    const handleShipping = async (e) => {
        e.preventDefault();
        console.log(inputQty)
        const data = {
            from: {
                postal_code : product.reseller.address.CEP
            },
            to : {
                postal_code : shippingCEP
            },
            products: [{
                id: product.id,
                width: product.shipping_data.width,
                length: product.shipping_data.length,
                weight: product.shipping_data.weight,
                height: product.shipping_data.height,
                insurance_value : product.current_price,
                quantity: inputQty
            }]
        }
        try {
            const response = await api.post('shipping', data)
            setShippingAddress(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    function changeShipping(event) {
        const value = parseInt(event.target.value)
        const final = shippingAddress.find(id => id.id === value)
        setSelectedShipping(final)
        localStorage.setItem('selected_shipping', JSON.stringify(final))
    }
    return (
            <>
            <div className="detail__section">
                <div className="detail__section__body">
                    <div className="detail__section_title">
                        <Title title={props.detailProd.name} />
                        <hr/>
                        <p>R$ <span> {product.price}</span></p>
                    </div>

                    <div className="ScrollDescription">
                        <p className="productDescription"> {product.description}</p>
                    </div>

                    <div className= "SellerName"> 
                        <h3>Vandè: <span className="hovSeller">{getSeller[0]}</span></h3> <br />
                        <div className="sellermoreInfo">
                            <img src={getSeller[1]} alt="" />
                            <div>
                                <h3>Non:   <span className="detaysellerA"> {getSeller[0]}</span></h3>
                                <h3>Lokal: <span className="detaysellerA">{!getSeller[2] ? '' : getSeller[2].city}, {!getSeller[2] ? '' : getSeller[2].state} </span></h3>
                                {/* <h3>Tip:  <span className="detaysellerA">  Pèsonèl</span></h3> */}
                            </div>
                        </div>
                    </div>

                    <div className= "SizeColorsAmout">
                        <div className="detail__size_quantity">
                            {productSize.length>0 ?
                                <div className="size">

                                    <p>Gwosè :</p> 
                                    <div >
                                        {productSize.map((i, j)=> (
                                            <button
                                            className="btn"
                                            onClick={e=> getProductSize(i, j)}
                                            key={j}
                                            style={
                                                {border: `
                                                    ${sizeSelect === j ? '2px solid red': '' }
                                                    `}
                                            }
                                            > {i.productSize}</button>
                                        ))}
                                    </div>
                                </div>
                                : ''
                            }

                            <div className="quantity">
                                <InputQuantity type="number" label="Kantite" increment={incrementButton} decrement={decrementButton} value={inputQty} onChange={e => setInputQty(e.target.value)}/>
                            </div>
                        </div>
                                <p className="text-danger">{errorMessage}</p>
                        
                

                            {productCor.length>0 ? 
                                <div className="detail_cor">
                                    <p>Koulè :</p> 
                                        <div>
                                        {productCor.map((i, j)=> (
                                            // <button value={i.productSize} onClick={e => setBtnValue(e.target.value)} key={index}> {i.productSize}</button>
                                            <button
                                                onClick={e => getProductCor(i, j)}
                                                className="btn"
                                                key={j} 
                                                style={
                                                    {background:`
                                                        ${i.productCor === 'black' ? 'black' : ''}
                                                        ${i.productCor === 'red' ? 'red' : ''}
                                                        ${i.productCor === 'white' ? 'white' : ''}
                                                        ${i.productCor === 'brown' ? 'brown' : ''}
                                                    `,
                                                    border: `
                                                            ${corSelect === j ? '2px solid blue': '' }
                                                    `}
                                                }
                                            /> 
                    
                                        ))}

                                        </div>
                                </div>
                            : ''}
                        
                    </div>
                    <div className="frete__box">
                        <form className="form-inline" onSubmit={handleShipping}>
                            <div className="form-group mb-2">
                                <input type="text" className="form-control" placeholder="CEP" value={shippingCEP} onChange={e => setShippingCEP(e.target.value)}/>
                                <button type="submit" className="btn btn-primary ">Kalkile</button>
                            </div>
                        </form>
                        <div className=" frete__list">
                            {shippingAddress.map((ship, index) => (
                                <div className="frete__detail">
                                    <input className="" type="radio" name="exampleRadios" id="exampleRadios1" value={ship.id} onChange={changeShipping}/>
                                    <div className="frete_detail_info">
                                        <div>Lap rive nan {ship.custom_delivery_time} jou </div> 
                                        <div> {ship.custom_price}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    
            {errorMessage ?
                <div className="detail__footer">
                    <button disabled onClick={addToCart} className="btn1"> <FaOpencart size={30}/> Ajoute nan panye</button>
                    <button disabled onClick={handlePurchase} className="btn1 ">  Achte</button>
                </div>
            :
                <div className="detail__footer">
                    <button onClick={addToCart} className=" btn1"> <FaOpencart size={30}/> Ajoute nan panye</button>
                    <button onClick={handlePurchase} className="btn2">  Achte</button>
                </div>

            }

            </div>

        </div>
    </>
    )
}
