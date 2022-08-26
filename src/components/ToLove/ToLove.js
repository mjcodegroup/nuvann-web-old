import React, {useEffect, useState} from 'react'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick'
import api from '../../services/api'
import ProductGrid from '../ProductGrid/ProductGrid';
import Title from '../Title/Title';

import './styles.scss'


export default function ToLove() {
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
    slidesToShow: 5,
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
          speed: 500,
          slidesToShow: 2,
          initialSlide: 0,
          dots: true,
          arrows: false


        }
      }
    ]
  };
    return (
      <>
        { products.length>0?
          <div className=" love-section">
          <Title  title=" Wap renmen"/>
          <Slider {...settings}>
            {products.map((product, index)=>(
              <div key={product.id} >
                <ProductGrid
                  to={`api/products/${product.id}`}
                  img={product.img}
                  alt1={product.img}
                  img2={product.img2} 
                  productName={product.name}
                  productPrice={product.price}
                  currentPrice ={product.current_price}
                />
              </div>
            ))}
          </Slider>
        </div>
        :
          ''
        }
       </>
    )
}
