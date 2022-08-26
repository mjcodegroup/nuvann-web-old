import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'

import { RiDeleteBin6Line } from "react-icons/ri";
import './styles.scss'
import InputQuantity from '../../components/InputQuantity/InputQuantity';
import Footer from '../../components/Footer/Footer';
import CartSlide from './CartSlide';
import CartTotal from './CartTotal';
import Title from '../../components/Title/Title';
import api from '../../services/api';
import Swal from 'sweetalert2';

import useFullPageLoader from '../../contexts/hooks/useFullPageLoader';

export default function Cart() {
    const [loader, showLoader, hideLoader] =useFullPageLoader()
    
    const [ cart , setCart] = useState([]);
    const [errorMessage, setErrorMessage] = useState('')

const [qty, setQty] = useState(1)
const [cartTotal, setCartTotal] = useState(0)


useEffect(() => {
    showLoader()
    const fetchData = async()=> {
        const request = await api.get(`cart`)
        const result = request.data
        if(result.message){
            setCart([])
        }else{
            setCart(result)
        }
        hideLoader()
    }
    const getTotal = async()=> {
        const request = await api.get(`cart/get-total`)
        localStorage.setItem('cartTotal', request.data.sum)
        setCartTotal(request.data.sum)
    }
    getTotal()
    fetchData();
    
}, [])

const getTotal = async()=> {
    const request = await api.get(`cart/get-total`)
    setCartTotal(request.data.sum)
    localStorage.setItem('cartTotal', request.data.sum)
}

async function deleteCartProduct (id) {

    const data = {
        id: id
    }
    try {
        const response = await api.post(`cart/delete`, data)
        if(response.status === 200){
            const newCart = cart.filter(i=>i.product_id !== id)
            setCart(newCart)
        }
    } catch(error) {
        const message =error.response.data.message
        Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: message,
            showConfirmButton: false,
            timer: 3000
        })
    }
}

const update =async (item)=> {
    try {
        await api.post(`cart/update`, item)

    } catch (error) {
        console.log(error)
    }
}

const incrementButton = async (index) => {
    let data = [...cart]
    let proQty = data[index].quantity + 1
    let proAmount =  data[index].product.amount
    if(proAmount <proQty) {
        setErrorMessage(`kantite maksimòm: ${proAmount}`)
    } else{
        setErrorMessage('')
        data[index].quantity ++;
        setCart(data)
        
        let quantity = data[index].quantity
        const p_id =data[index].product_id
        
        const item = {
            product_id: p_id,
            quantity,
        }
        update(item)
        
        setTimeout(function(){
            getTotal()
        }, 1500);
    }
}
const decrementButton =(index)=>{
    let data = [...cart]
    if(data[index].quantity > 1){
        let proQty = data[index].quantity
        let proAmount =  data[index].product.amount

        if (proAmount <proQty) {
            setErrorMessage(`kantite maksimòm: ${proAmount}`)
        } else {

            setErrorMessage('')
            data[index].quantity --;
            setCart(data)
            
            
            let quantity = data[index].quantity
            const p_id =data[index].product_id
            const item = {
                product_id: p_id,
                quantity,
            }
            update(item)
            setTimeout(function(){
                getTotal()
            }, 1500);
        }
    }
}
    return (
        <>
            <Navbar/>
            <div className="cart__section">
            {loader}
                {cart.length < 1 && !loader ? 
                    <div className="container empty__cart">
                        <div className="empty__cart_content">
                            <h3>Ou poko achte anyen !!</h3>
                            <Link to="/#" className="btn btn-outline-primary">Plis pwodui</Link>
                        </div>
                    </div>


                :
                    <div className="container">
                        <div className="cart__grid">
                            <div>
                                 <div className="card__title">
                                    <Title title="Panye" />
                                </div>
                                {cart.map((product, index) => (
                                <div className="card" key={product.id}>
                                    <div className="product-side">
                                        <div className="form-check">
                                        </div>
                                        <img src={product.product.img} alt="productImg"/>
                                        <div className="card__product-detail">
                                            <h5>{product.product.name   }</h5>
                                            <small>Vandè <Link to="/#">{product.product.reseller.name}</Link></small>
                                            <small>Tamanho:  <span>42</span></small>
                                            <small> koulè : <span>Gri</span></small>
                                        </div>
                                        <div className="card__product-icon-delete"><RiDeleteBin6Line onClick={() => deleteCartProduct(product.product.id)}/></div>
                                    </div>
                                    <hr/>
                                    <div className="card__product-footer">
                                        <div className="card__product-footer-quantity">
                                            <InputQuantity label="Kantite" value={product.quantity} onChange={e => setQty(e.target[index].value)} increment={()=> incrementButton(index)} decrement={()=>decrementButton(index)}/>
                                        </div>


                                        <div className="card__product-footer-price">
                                            <p>$ {product.amount} <small> $ {product.product.discount?product.product.discount  : '' }</small></p>
                                        </div>
                                    </div>
                                <p className="text-danger text">{errorMessage}</p>
                                </div>
                                ))}
                            </div>
                            <CartTotal getTotal={cartTotal} getCart={cart} ErrorMessage={errorMessage}/>
                        </div>
                    </div>

                }

            </div>
            <CartSlide/>
            <Footer />
        </>
    )
}
