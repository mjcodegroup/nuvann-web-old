import React, { useContext } from 'react'
import {BrowserRouter, Route, Switch, Redirect} from  'react-router-dom'
import Cart from './pages/Cart/Cart'

import { Context } from './contexts/auth'

import Home from './pages/Home/Home'
import Admin from './pages/Admin/Home/Admin'
import Login from './pages/Auth/Login/Login'

import ResetPassword from './pages/Auth/ResetPassword/ResetPassword'
import PasswordConfirm from './pages/Auth/ResetPassword/PasswordConfirm'
import Loading from './components/Loader/Loading'
import { ProductDetail } from './pages/Detail/ProductDetail'
import  SellerAdm from './pages/Seller/SellerAdm'
import { SellerPersonalInfo } from './pages/Seller/sellerInfo/SellerPersonalInfo'
import { SellerAdress } from './pages/Seller/sellerInfo/SellerAdress'
import Product from './pages/Seller/product/Product'
import NewProduct from './pages/Seller/product/NewProduct/NewProduct'
import Order from './pages/Seller/Sale/Order'
import { Purchase } from './pages/Purchase/Purchase'
import StepContext from './contexts/StepContext'
import  Profile  from './pages/Profile/Profile'
import { ProductPurchase } from './pages/ProductPurchase/ProductPurchase'
import { Promotion } from './pages/Promotion/Promotion'
// import CartContext from './contexts/CartContext'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Search from './pages/Search/Search'
import { NotFound } from './pages/NotFoundPage/NotFound'
import { Categories } from './pages/Categories/Categories'
import { Category } from './pages/Admin/Pages/Category/Category'
import { SubCategory } from './pages/Admin/Pages/SubCategory/SubCategory'
import { StrValidator } from './pages/StrValidator/StrValidator'




function CustomRoute({ isPrivate, ...rest }) {
  const { loading, authenticated } = useContext(Context);

  
  if (loading) {
    return <Loading/>
  }

  if (isPrivate && !authenticated) {
    return <Redirect to="/login" />
  }

  return <Route {...rest} />;
}
const stripePromise = loadStripe("pk_test_51Ioa1aHZLW8CFmhi3Yf4iuBwhHpzWP6ReiCA4thTMVaKS5xUtyymV5rHdeqBD9I3q0hlrURLZ3vw2BhU3NjalChz007gKAvY3x");

export default function routes() {

  return (
    <BrowserRouter>
      <Switch>

        <CustomRoute path="/login" exact component={Login} />
        <CustomRoute path="/" exact component={Home} />
        <CustomRoute path="/passwordreset" exact component={ResetPassword} />
        <CustomRoute path="/passwordConfirm/:id" exact component={PasswordConfirm} />

        <CustomRoute isPrivate  path="/profile" exact component={Profile} />
        <CustomRoute isPrivate  path="/product/purchase" exact component={ProductPurchase} />
        
        <CustomRoute path="/api/products/:id" exact component={ProductDetail} />
        <CustomRoute isPrivate  path="/cart" exact component={Cart} />
        <CustomRoute isPrivate  path="/sellerinfo" exact component={SellerPersonalInfo} />
        <CustomRoute isPrivate  path="/selleradress" exact component={SellerAdress} />

        <CustomRoute  path="/promotion" exact component={Promotion} />
        <CustomRoute  path="/categories" exact component={Categories} />

        <CustomRoute isPrivate  path="/seller" exact component={SellerAdm} />
        <CustomRoute isPrivate  path="/seller/product" exact component={Product} />
        <CustomRoute isPrivate  path="/seller/product/new" exact component={NewProduct} />
        <CustomRoute isPrivate  path="/seller/product/order" exact component={Order} />
        <CustomRoute isPrivate  path="/seller/strvalidator" exact component={StrValidator} />

        <CustomRoute isPrivate  path="/admin" exact component={Admin} />
        <CustomRoute isPrivate  path="/admin/category" exact component={Category} />
        <CustomRoute isPrivate  path="/admin/sub-category" exact component={SubCategory} />


        <CustomRoute path="/search" exact component={Search} />
        <Elements stripe={stripePromise}>
          <StepContext >
            <CustomRoute isPrivate  path="/purchase" exact={true} component={Purchase} />
          </StepContext>
        </Elements>

        <CustomRoute exact component={NotFound} />


        <Route path='*' exact={true} component={Home} />
      </Switch>
    </BrowserRouter>
  )
}
