import React from 'react'
import { SimpleNavbar } from '../../components/Navbar/SimpleNavbar/SimpleNavbar'
import { SimpleSidebar } from '../../components/Navbar/SimpleNavbar/SimpleSidebar'

import  './styles.scss'

export default function   SellerAdm () {
    return (
        <>
        <SimpleNavbar />
        <div className="Seller__container">
            <div className="">
                <SimpleSidebar />
            </div>
            <div className="">
                <h1>hello from the seller page</h1>
            </div>

        </div>
        </>
    )
}