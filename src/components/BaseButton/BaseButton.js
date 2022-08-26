import React from 'react'
import './styles.scss'

export default function BaseButton({
    label,
    type,
    onClick,
    className
}){
    return (
        <button className={className} onClick={onClick} type={type}>{label}</button>
    )
}
