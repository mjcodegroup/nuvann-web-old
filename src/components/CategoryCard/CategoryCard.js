import React from 'react'
import './styles.scss'

import firstImage from '../../assets/Cardpromo/vetman.png'
import SecondImage from '../../assets/Cardpromo/enfomatik.png'
export const CategoryCard = () => {
    return (
        <div className="PromCardHolder">
            <img src={firstImage} className="Card1" alt="" />
            <img src={SecondImage} className="Card2" alt="" />
        </div>
    )
}
