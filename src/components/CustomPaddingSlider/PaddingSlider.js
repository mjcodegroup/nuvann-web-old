import React, { useEffect, useState } from 'react'
import Slider from 'react-slick'

import './styles.scss'

export default function PaddingSlider(props) {
  const [product, setProduct] = useState(props.detail)

//   useEffect(() => {
//     const fetchData = async()=> {
//         await setProduct(props.detail)
//     }
//     fetchData()
// }, [props.detail])
  
  const settings = {
    customPaging: function(i) {
      return (
        <></>
      // <a to="#">
      //     {/* <img src={fisrtProductImg} alt="one"/> */}
      //   </a>
      );
    },
    // dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

    return (

    <div className="love-section">
        
        {/* {products.map((product, index)=>( */}
          <Slider {...settings}>
                <img src={props.detail.img} alt="prestige"/>
                <img src={props.detail.img2} alt="slide2"/>
                <img src={props.detail.img3} alt="slide3"/>
        </Slider>
        {/* ))} */}
    </div>
    )
}
