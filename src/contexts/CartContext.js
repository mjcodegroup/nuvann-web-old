/* eslint-disable react-hooks/rules-of-hooks */
import React, { createContext, useState, useEffect } from 'react'
// import Cart from '../pages/Cart/Cart';
import api from '../services/api';

export const getCartContext = React.createContext();


const CartContext = ({children}) => {
    const [ cart , setCart] = useState([]);

    useEffect(() => {
        try {
        api.get(`/cart`)
            .then(response => {
            const cartData = response.data.data
            setCart(cartData)
        })
        } catch(error) {
            console.log(error)
        }
    
    }, [])
    console.log(cart)
   

    
    return (
        <div>
            <getCartContext.Provider 
                value={{
                    cart
                }}
            >
                {children}
            </getCartContext.Provider>
            
        </div>
    )
}
export default  CartContext;
