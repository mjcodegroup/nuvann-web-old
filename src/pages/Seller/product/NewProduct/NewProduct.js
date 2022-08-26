import React from 'react'
import { SimpleNavbar } from '../../../../components/Navbar/SimpleNavbar/SimpleNavbar'
import { SimpleSidebar } from '../../../../components/Navbar/SimpleNavbar/SimpleSidebar'
import NewProductForm from './NewProductForm'
import './styles.scss'

export default function NewProduct() {
    return (
        <>
            <SimpleNavbar />
            <div className="seller__newProduct_container">
                <div>
                    <SimpleSidebar /> 
                </div>
                <div>
                    <NewProductForm />
                </div>
            </div>
        </>
    )
}
