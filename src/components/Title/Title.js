import React from 'react'
import './styles.scss'

export default function Title({title, className}) {
    return (
        
        <div className="section-title">
            <h4 className={className}>{title}</h4>
        <div></div>
        </div>
    )
}
