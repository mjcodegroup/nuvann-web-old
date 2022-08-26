import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import SameCategory from '../../components/SameCategory/SameCategory'
import PaddingSlider from '../../components/CustomPaddingSlider/PaddingSlider'
import Footer from '../../components/Footer/Footer'
import Navbar from '../../components/Navbar/Navbar'
import api from '../../services/api'
import { ProductDetailDescription } from './ProductDetailDescription'
import useFullPageLoader from '../../contexts/hooks/useFullPageLoader';

import './styles.scss'

export const ProductDetail = () => {
    const [sameCategory, setSameCategory] = useState([])
    const [product, setProduct] = useState([])

    const params = useParams()
  const [loader, showLoader, hideLoader] =useFullPageLoader()

    
    

    useEffect(() => {
        const fetchData = async()=> {
            showLoader()
            const request = await api.get(`products/${params.id}`)
            setSameCategory(request.data.sameCategory)
            setProduct(request.data.product)
            hideLoader()
        }
         fetchData();
    }, [params.id])
    return (
        <>
        <Navbar/>
        {loader}
        <div className="container">
            <div className="product__detail_section">
                    <div className="row">
                        <div className="col-md-5">
                            <PaddingSlider detail={product}/>
                        </div>
                        <div className="col-md-7">
                        <ProductDetailDescription  detailProd={product}/>
                        </div>
                    </div>
                </div>
            </div>
        <div>
            <SameCategory getCategory={sameCategory} />
        </div>
        <Footer />
        </>
    )
}
