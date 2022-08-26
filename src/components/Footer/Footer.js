import React, {useContext} from 'react'
import {TiLocation, TiMail, TiPhoneOutline} from 'react-icons/ti'
import {SiInstagram, SiTwitter} from 'react-icons/si'
import {ImFacebook} from 'react-icons/im'
import {CgLogOut, CgProfile, CgShoppingCart} from 'react-icons/cg'
import { Context } from '../../contexts/auth'
import './styles.scss'

import visaIcon from '../../assets/payment-icone/visa.svg'
import masterCard from '../../assets/payment-icone/mastercard.svg'
import visacheckout from '../../assets/payment-icone/visacheckout.svg'
import paypal from '../../assets/payment-icone/paypal.svg'
import elo from '../../assets/payment-icone/elo.svg'
import boleto from '../../assets/payment-icone/boleto.svg'





export default function Footer() {
  const {handleLogout } = useContext(Context);
  const handleLogOut=(e)=> {
    handleLogout(e)
    window.location.reload()
  }
    return (
        <footer className="footer container-fluid">
            <div className=" bottom_border">
                <div className="row">
                    <div className=" col-sm-4 col-md col-sm-4  col-12 col  footer-adress">
                        <h5 >Kontakte Nou</h5>
                        <p className="mb10">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                        <p><TiLocation size={20}/> Rua Inambu 540, Efapi-Chapeco, SC</p>
                        <p><TiPhoneOutline size={20}/>  +55-9999878398  </p>
                        <p><TiMail size={20}/> enfo@nuvann.com  </p>
                    </div>
                
                
                    <div className=" col-sm-4 col-md  col-6 col">
                        <h5 >Rakousi Enfo</h5>
                        <ul className="footer-list">
                            <li><a href="/#">Komanw kapab Vann</a></li>
                            <li><a href="/#">komanw ka fè yon reklamasyon</a></li>
                            <li><a href="/#">Komanw kapab Vann</a></li>
                            <li><a href="/#">komanw ka fè yon reklamasyon</a></li>
                            <li><a href="/#">Komanw kapab Vann</a></li>
                            <li><a href="/#">komanw ka fè yon reklamasyon</a></li>
                          
                        </ul>
                    </div>
                
                
                    <div className=" col-sm-4 col-md  col-6 col">
                    <h5 className="footer-header col_white_amrc pt2">Relayon Nuvann</h5>
                        <ul className="footer-list">
                            <li><a href="/#">Komanw kapab Vann</a></li>
                            <li><a href="/#">komanw ka fè yon reklamasyon</a></li>
                            <li><a href="/#">Komanw kapab Vann</a></li>
                            <li><a href="/#">komanw ka fè yon reklamasyon</a></li>
                            <li><a href="/#">Komanw kapab Vann</a></li>
                            <li><a href="/#">komanw ka fè yon reklamasyon</a></li>
                        </ul>
                    </div>
                
                
                    <div className=" col-sm-4 col-md  col-12 col text-center">
                        <h5 className="footer-header">Espas Kliyan</h5>
                        
                        <ul className="footer-list client-space">
                            <li ><a href="/#"><CgProfile size={20} />Profil</a></li>
                            <li><a href="/#"><CgShoppingCart size={20} />Panye</a> </li>
                            <li onClick={handleLogOut}><a href="/#"><CgLogOut size={20} /> Dekonekte</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            
            <hr />
            <div className="container">
                <ul className="footer-menu">
                    <img src={visaIcon} alt={visaIcon}/>
                    <img src={visacheckout} alt={visacheckout}/>
                    <img src={masterCard} alt={masterCard}/>
                    <img src={elo} alt={elo}/>
                    <img src={paypal} alt={paypal}/>
                    <img src={boleto} alt={boleto}/>
                </ul>
                <p className="text-center">Copyright @2017 | <a href="https://www.mjcode.net/" target="_blank">MJcode</a></p>
                
                <ul className="footer-social-media">
                    <li><a href="http://webenlance.com"><ImFacebook size={20}/> </a></li>
                    <li><a href="http://webenlance.com"><SiTwitter size={20}/></a></li>
                    <li><a href="http://webenlance.com"><SiInstagram size={20}/></a></li>
                </ul>
            </div>
        
        </footer>
        
    )
}
