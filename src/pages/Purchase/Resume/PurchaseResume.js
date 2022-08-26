import React, { useContext,useState, useEffect } from 'react';

import './styles.scss'
import {
    useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement
} from '@stripe/react-stripe-js';

import { multiStepContext } from '../../../contexts/StepContext'
import api from '../../../services/api';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';

export const PurchaseResume = () => {
    const history = useHistory();
    const stripe = useStripe();
    const elements = useElements();
    const [product, setProduct] = useState([]);
    const [purchaseTot, setPurchaseTot] = useState(0)
    const [disableButton, setDisableButton] = useState(false)

    const {setStep, submitData,
        name, setName,
        CPF, setCPF,
        CEP,
        address,
        number,
        neighborhood,
        city,
        state,
        country,
        userProfile
    
      } = useContext(multiStepContext)

      useEffect(() => {
        const getProduct=async () => {
          const purchaseTotal = localStorage.getItem('cartTotal')
          const purchase_detail = JSON.parse(localStorage.getItem('purchase_detail'))
          const where = localStorage.getItem('where')
          if(where === 'cart') {
            const response = await api.get(`cart`)
            const products = response.data.map(cart=>{
                const desc = JSON.parse(cart.description)
                return {
                    img: cart.product.img,
                    name: cart.product.name,
                    id: cart.product.id,
                    price: cart.amount,
                    quantity: cart.quantity,
                    color: desc.color.productCor,
                    size: desc.size.productSize
                } 
            })
            // setCart(response.data)
            setProduct(products)
            setPurchaseTot(purchaseTotal)
          } else{
            setProduct((purchase_detail))
            setPurchaseTot(purchase_detail[0].purchase_total)
          }
    
        }
        getProduct()
        
    }, [])
    
    const freteOption  = JSON.parse(localStorage.getItem('selected_shipping'))
    const handleSubmit = async()=> {
        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }
        let card = elements.getElement(CardNumberElement, CardCvcElement,CardExpiryElement);
        const result = await stripe.createToken(card);
            if(result.error) {
                if (result.error.code === 'incomplete_number'){
                    const message = "svp, verifye Numero Kat lan"
                        Swal.fire({
                            position: 'top-end',
                            icon: 'error',
                            title: message,
                            showConfirmButton: false,
                            timer: 3000
                    })
                    return
                }
                if (result.error.code === 'incomplete_cvc'){
                    const message = "svp, verifye CVC kat lan"
                        Swal.fire({
                            position: 'top-end',
                            icon: 'error',
                            title: message,
                            showConfirmButton: false,
                            timer: 3000
                    })
                    return
                }
                if (result.error.code === 'incomplete_expiry'){
                    const message = "svp, verifye dat Expirasyon Kat lan"
                        Swal.fire({
                            position: 'top-end',
                            icon: 'error',
                            title: message,
                            showConfirmButton: false,
                            timer: 3000
                    })
                    return
                }
                if(name && CPF && !result.error) {
                    setDisableButton(true)
                }
            }

        const shipping = {
            CEP,
            address,
            number,
            neighborhood,
            city,
            state,
            country
        }
        const data = {
          ...result,
          type: "cc",
          gateway: "stripe",
          client_name: userProfile.name,
          client_email:userProfile.email,
          products: product,
          purchase_total: parseFloat(purchaseTot) + parseFloat(freteOption.custom_price),
          shipping_address: shipping
        }
        try {
        
            await api.post('checkout/payment', data)
            .then(response => {
                
            const message = response.data.message
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: message,
                    showConfirmButton: false,
                    timer: 3000
                })
            });
            history.push('/')
            
            localStorage.removeItem('purchase_deŧail')
            window.location.reload()

        } catch(err) {
            // console.log('Failed to save: '+err.response.status)
            if(err.response.status === 500) {
                const message = err.response.data.message //"svp, gen yon ti pwob pou pwosesa Pèman an, re-eseye ankò"
                        Swal.fire({
                            position: 'top-end',
                            icon: 'error',
                            title: message,
                            showConfirmButton: false,
                            timer: 8000
                    })  
            } else {
                const message = err.response
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: message,
                    showConfirmButton: false,
                    timer: 5000
            })  
            }
        }
        
    }

    return (
        <>
            <div className="purchase__resume">
                    <h6>Rezime</h6>
                <div className="first">
                    {product.map((prod, index)=> (
                        <div className="purchase__resume_first_grid">
                            <div className="purchase__resume_img">
                                <img className="rounded-circle" src={prod.img} alt={prod.img}/>
                            </div>
                            <div className="">
                                <h6>{prod.name}</h6>
                                <small>{prod.current_price|| prod.price}</small>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
            <div className="purchase__total">
                <div className="product_tot">
                    <span>Pwodui</span>
                    <span>{purchaseTot}</span>
                </div>
                <div className="product_tot">
                    <span>Transpò</span>
                    <span>{freteOption.custom_price}</span>
                </div>
                <hr/>
                <div className="product_tot last">
                    <span>Total</span>
                    <span>{parseFloat(purchaseTot) + parseFloat(freteOption.custom_price)}</span>
                </div>
                <div className="purchase_total_btn">
                    {CPF && name !== '' ?
                    <button className="btn btn-success" onClick={handleSubmit}>Konfime</button>
                    :
                    <button className="btn btn-success" onClick={handleSubmit} disabled>Konfime</button>
                    }
                </div>
                
                {/* <Base /> */}
            </div>
        </>
    )
}
