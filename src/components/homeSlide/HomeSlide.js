import React from 'react'
import './styles.css'

import slide from '../../assets/slide/slide.jpg'
import slide1 from '../../assets/slide/slide1.jpg'
import slide5 from '../../assets/slide/slide5.png'

export default function HomeSlide() {
    return (
        <div className="carousel-section">
            <div id="carouselExampleControls" className="carousel slide" data-ride="carousel" >
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src={slide1} className="d-block w-100 " alt={slide1} />
                    </div>
                    <div className="carousel-item">
                        <img src={slide} className="d-block w-100" alt={slide} />
                    </div>
                    <div className="carousel-item">
                        <img src={slide5} className="d-block w-100" alt={slide5} />
                    </div>
                </div>
                <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>
        </div>
    )
}
