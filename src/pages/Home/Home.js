import React, {useContext} from "react"; 
import { CategoryCard } from "../../components/CategoryCard/CategoryCard";
import Clothes from "../../components/Clothes/Clothes";
import Cosmetics from "../../components/cosmetics/Cosmetics";
import Enfomatik from "../../components/Enfomatik/Enfomatik";
import Footer from "../../components/Footer/Footer";
import HomeSlide from "../../components/homeSlide/HomeSlide";

import Navbar from "../../components/Navbar/Navbar";
import NewProducts from "../../components/NewProduct.js/NewProducts";
import ToLove from "../../components/ToLove/ToLove";

import { Context } from '../../contexts/auth'

import './styles.scss'

export default function Home() {
  const {authenticated} = useContext(Context);


  return (
    <>
      <Navbar />
        <HomeSlide />
        <div className="home__container">

        <NewProducts />
        {authenticated ? <ToLove/>  : ''}
        <CategoryCard />
      <Enfomatik />
      <Clothes />
      <Cosmetics />      
        </div>
      <Footer/>

    </>
  )
}
