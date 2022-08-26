import React, {useEffect, useState} from 'react'
import {Link, useParams} from 'react-router-dom'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick'


import api from '../../services/api'

import './styles.scss'

import Title from '../../components/Title/Title';
import ProductGrid from '../../components/ProductGrid/ProductGrid';

export default function CartSlide() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    
    api.get('home-data').then(response=> {
      const result = response.data.toLoves
      if(!result){
        setProducts([])
      }else{
          setProducts(response.data.toLoves)
      }
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
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 570,
        settings: {
          infinite:true,
          slidesToShow: 1,
          slidesToScroll: 2,
          initialSlide: 2

        }
      }
    ]
  };

  const filter = useParams();

    return (

    <div className=" love-section">
    <Title  title="Menm kategory"/>
        
      <Slider {...settings}>
        {products.map((product, index)=>(
          <div key={product.id}>
            <ProductGrid
              to={`api/products/${product.id}`}
              img={product.img}
              img2={product.img2}
              productName={product.name}
              productPrice={product.price}
              productDiscount={product.discount}
            />
          </div>
        ))}
      </Slider>
    </div>
    )
}
