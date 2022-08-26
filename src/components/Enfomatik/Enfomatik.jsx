import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick'


import api from '../../services/api'

import './styles.scss'


import Title from '../Title/Title';
import ProductGrid from '../ProductGrid/ProductGrid';

export default function Enfomatik() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    api.get('home-data').then(response=> {
        setProducts(response.data.enfomatik)
    });
  },[])

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          initialSlide: 0
        }
      },
      {
        breakpoint: 570,
        settings: {
          infinite:true,
          speed: 250,
          slidesToShow: 2,
          initialSlide: 0,
          dots: true,
          arrows: false
        }
      }
    ]
  };


    return (

    <div className=" Enfomatik__section love-section">
    <Title  title=" Enfòmatik"/>
        
      <Slider {...settings}>
        {products.map((product, index)=>(
          <div key={product.id}>
            <ProductGrid
              to={`api/products/${product.id}`}
              img={product.img3} 
              img2={product.img}
              productName={product.name}
              productPrice={product.price}
              productDiscount={product.discount}
              currentPrice ={product.current_price}
            />
          </div>
        ))}
      </Slider>
    </div>
    )
}
