import React from 'react'
import loader from '../../assets/loader.gif'
import './styles.scss'

export default function Loading() {
    return (
        <div className="container-fluid loader-container">
            <div className="loader">
                <img src={loader} alt="loading..."/>
            </div>
        </div>
    )
}
