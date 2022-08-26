import { TextField } from '@material-ui/core'
import React, {useState, useContext, useEffect} from 'react'
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'
import api from '../../../services/api';
import { multiStepContext } from '../../../contexts/StepContext'

import {
        useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement
    } from '@stripe/react-stripe-js';
import Swal from 'sweetalert2';
import { useHistory } from 'react-router-dom';



  const CARD_ELEMENT_OPTIONS = {
    style: {
      base: {
        lineHeight: "27px",
        color: "#212529",
        fontSize: "1.1rem",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

export default function StepThree(props) {
  const [errorMsg, setErrorMsg] = useState('');
  const history = useHistory();
  const stripe = useStripe();
  const elements = useElements();
  const [ cart , setCart] = useState([]);
  const [product, setProduct] = useState([]);
  const [purchaseTot, setPurchaseTot] = useState(0)

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
        const products = response.data.map(cart=> cart.product)
        setCart(response.data)
        setProduct(products)
        setPurchaseTot(purchaseTotal)
      } else{
        setProduct((purchase_detail))
        setPurchaseTot(purchase_detail[0].purchase_total)
      }

      }
      getProduct()
      
    }, [])


    // const handleSubmitData= async (event)=> {
    //     event.preventDefault();
    //     setErrorMsg('');
    //     await submitData(event)
    //     if (!stripe || !elements) {
    //         // Stripe.js has not yet loaded.
    //         // Make sure to disable form submission until Stripe.js has loaded.
    //         return;
    //     }
    //     let card = elements.getElement(CardNumberElement, CardCvcElement,CardExpiryElement);
    //     const result = await stripe.createToken(card);
    //     const shipping = {
    //         CEP,
    //         address,
    //         number,
    //         neighborhood,
    //         city,
    //         state,
    //         country
    //     }
    //     const data = {
    //       ...result,
    //       type: "cc",
    //       gateway: "stripe",
    //       client_name: userProfile.name,
    //       client_email:userProfile.email,
    //       products: product,
    //       purchase_total: purchaseTot,
    //       shipping_address: shipping
    //     }
    //     // let cardNumber = elements.getElement(CardNumberElement)
    //     try {
        
    //      await api.post('checkout/payment', data)
    //       .then(response => {
            
    //        const message = response.data.message
    //         Swal.fire({
    //             position: 'top-end',
    //             icon: 'success',
    //             title: message,
    //             showConfirmButton: false,
    //             timer: 3000
    //         })
    //       });
    //       history.push('/')
         
    //       localStorage.removeItem('purchase_deŧail')
    //       window.location.reload()

    //   } catch(err) {
    //       console.log('Failed to save: '+err)
    //   }

    // }

    return (
         <div className="purchase__three">
            <form action="">
                <div className="left">
                    <div className="stripe__input">
                        {/* <label htmlFor="cc-number">Nimewo kat la</label> */}
                        <CardNumberElement
                        id="cc-number"
                        value='4242 4242 4242 4242'
                        className="form-control"
                        options={CARD_ELEMENT_OPTIONS}
                        />
                    <TextField fullWidth={30} id="standard-basic" label="Nom mèt kat la" value={name} onChange={(e)=>setName(e.target.value)}/>
                    <TextField fullWidth={30} required id="standard-basic" label=" CPF " value={CPF} onChange={(e)=>setCPF(e.target.value)}/>
                    </div>
                </div>

                <div className="right">
                    <div className="stripe__input">
                        {/* <label htmlFor="cvc">CVC</label> */}
                        <CardCvcElement
                        id="cvc"
                        value='123'
                        className="form-control"
                        options={CARD_ELEMENT_OPTIONS}
                        />
                    </div>
                    <div className="stripe__input">
                        <CardExpiryElement
                        id="expiry"
                        value='12/23'
                        className="form-control"
                        options={CARD_ELEMENT_OPTIONS}
                        />
                    </div>
                </div>
            </form>
                <span><BsChevronLeft size={30} onClick={()=>setStep(1)}/></span>
            <span>
              {/* <BsChevronRight size={30}/> */}
                {/* <div className="spinner-border spinner-border-sm text-light" role="status"></div>  */}
            </span>
        {errorMsg && <div className="text-danger mt-2">{errorMsg}</div>}
        
        </div>
    )
}
