import React from 'react'
import './styles.scss'

export default function BaseInput({label, type, onChange, value, onBlur}) {
    return (
        <>
            <div className="group">      
                <input type={type} required onChange={onChange} value={value} onBlur={onBlur}/>
                <label>{label}</label>
            </div>
        </>
    )
}
