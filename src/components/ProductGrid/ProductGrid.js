import React from 'react'
import {Link} from 'react-router-dom'
import './styles.scss'


export default function ProductGrid({img,alt1,img2,to,productName, productPrice, currentPrice}) {

    return (
        <div className="product-grid3">
            <div className="product-image3">
                <Link to={to}>
                <img className="pic-1" src={img} alt={alt1}/>
                    <img className="pic-2" src={img2}  alt={img2}/>
                </Link>
                {/* <span className="product-new-label">New</span> */}
            </div>
            <div className="product-content">
                <h3 className="title"> {(productName && productName.length > 18) ? productName.substring(0,18)+'...' : productName} </h3>
                {currentPrice ? 
                    <div className="price">
                        $ {currentPrice}
                        <span>$ {productPrice}</span>
                    </div>
                : 
                    <div className="price">
                        $ {productPrice}
                    </div>
                }
            </div>
        </div>
    )
}
