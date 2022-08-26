import React from 'react'
import './styles.scss'

export default function InputQuantity({increment, decrement, name, value, type, label, onChange}) {

    return (
        <>
        <span>{label}</span>
        <form className="count-inlineflex">
            <div className="qty-min" onClick={decrement}>-</div>
                <input type={type} name={name} value={value} onChange={onChange} className="qty" min="1"/>
            <div className="qty-max" onClick={increment}>+</div>
        </form>
        </>
    )
}
