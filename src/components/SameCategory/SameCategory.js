import React, {useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick'
import './styles.scss'

import Title from '../Title/Title';
import ProductGrid from '../ProductGrid/ProductGrid';

export default function SameCategory(props) {
  const [products, setProducts] = useState([props.getCategory])
  const history = useHistory()
  
  useEffect(() => {
    window.scrollTo(0,0)
    const fetchData = async(prod)=> {
      if(prod)
      setProducts(prod)
    }
    fetchData(props.getCategory)
  }, [props.getCategory])
  
  
const handleView = (id)=> {
  history.push(`api/products/${id}`)
  window.scrollTo(0,0)
}

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 1,
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
          infinite: true,
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
    <div className=" sameCategory__section love-section">
    <Title  title=" Menm Kategori Pwodui"/>
        
      <Slider {...settings}>
        {products.map((product, index)=>(
          <div key={product.id} onClick={()=>handleView(product.id)}>
            <ProductGrid
              to="/#"
              img={product.img2} 
              img2={product.img}
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
