import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
// import BaseInput from '../../components/Base-Input/BaseInput'
// import BaseButton from '../../components/BaseButton/BaseButton'
import Swal from 'sweetalert2/src/sweetalert2.js'



// import {SiFacebook} from 'react-icons/si'
// import {AiFillGoogleCircle} from 'react-icons/ai'

import './styles.scss'
import SignUp from '../SignUp.js/SignUp'
import FormLogin from './FormLogin'
// import { FaFacebookF} from 'react-icons/fa'
// import axios from 'axios'
import api from "../../../services/api";
import GoogleLogin from 'react-google-login'
import FacebookLogin from 'react-facebook-login';


export default function Login() {
    const history = useHistory();

    const [showSignUp, setShowSignUp] = useState(false)
    const [showLogin, setShowLogin] = useState(true)

    const loginForm= ()=> {
        setShowLogin(true)
        setShowSignUp(false)
    }

    const signUpForm= ()=> {
        setShowSignUp(true);
        setShowLogin(false)
    }


    const handleGoogle = async (googleData)=> {
        const obj = googleData.profileObj

        const data = {
            name:obj.name,
            email:obj.email,
            id:obj.googleId,
            profile:obj.imageUrl,
        }

        try {
            const response = await api.post('login/google/callback',data)
            console.log(response.data.message)
            localStorage.setItem('access_token', JSON.stringify(response.data.access_token))
            localStorage.setItem('user', JSON.stringify(response.data.user))
            history.push('/')
            window.location.reload();
        } catch(err) {
            const message = err.response.data.data.message
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: message,
                showConfirmButton: false,
                timer: 1500
            })
        }
    }

    const handleFacebook = async(faceData)=> {
        const data = {
            name:faceData.name,
            email:faceData.email,
            id:faceData.id,
            profile:faceData.picture.data.url,
        }
        try {
            const response = await api.post('login/facebook/callback',data)
            localStorage.setItem('access_token', JSON.stringify(response.data.access_token))
            localStorage.setItem('user', JSON.stringify(response.data.user))
            history.push('/')
            window.location.reload();
        } catch(err) {
            const message = err.response.data.data.message
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: message,
                showConfirmButton: false,
                timer: 1500
            })
        }
    }

    return (
        <>
        <div className="section__login">

            <div className=" container __login_section text-center">
       
                    <h5>Nuvann</h5>
                <div className="login_nav">
                    <Link to="/#"  onClick={loginForm}>Konekte</Link>
                    <div className="login__separator"></div>
                    <Link to="/#" onClick={signUpForm}>Enskri</Link>
                </div>
                <div className="social_media_button">
                    <GoogleLogin
                        clientId="1067548450245-8tg2gsessdu4gtgmmtdvec4d9ouutduu.apps.googleusercontent.com"
                        buttonText="Konekte avèk Google"
                        onSuccess={handleGoogle}
                        onFailure={handleGoogle}
                        cookiePolicy={'single_host_origin'}
                    />
                
                                        {/* <button className="btn btn-primary" onClick={handleGoogle}> <FaGoogle/> <span> </span></button> */}
                      <FacebookLogin
                        appId="1201867083549812"
                        autoLoad={false}
                        fields="name, email, picture"
                        textButton="Konekte avèk Facebook"
                        callback={handleFacebook}
                        size="small"
                        cssClass="btnFacebook"
                    />
                    
                    {/* <button className="btn btn-primary"><span></span></FacebookLogin></button>  */}
                </div>
                <div className="login__content text-center">
                    {showLogin ?
                        <FormLogin />
                            : 
                        <SignUp />
                    }
                </div>
                
            </div>
        </div>
        </>
    )
}
