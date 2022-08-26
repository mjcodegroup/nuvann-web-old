import React, { useState ,useContext} from 'react'
import { Link, useHistory} from 'react-router-dom'

import BaseInput from '../../../components/Base-Input/BaseInput'
import BaseButton from '../../../components/BaseButton/BaseButton'

import { Context } from '../../../contexts/auth';
import api from '../../../services/api';

import useFullPageLoader from '../../../contexts/hooks/useFullPageLoader';


import Swal from 'sweetalert2/src/sweetalert2.js'

export default function FormLogin() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const history = useHistory();

    const [loader, showLoader, hideLoader] =useFullPageLoader()


    async function handleLogin(e) {
        e.preventDefault()
        showLoader();

    const data= {
        email,
        password
    }
    
    await api.post('/login', data)
        .then(response => {
            const token = response.data.access_token
            localStorage.setItem('access_token', JSON.stringify(token))
            localStorage.setItem('user', JSON.stringify(response.data.user))
            hideLoader();
            history.push('/')
            window.location.reload();   
        }).catch(error=> {
            hideLoader()
            const message= error.response.data.error
            console.log(message)
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: message,
                showConfirmButton: false,
                timer: 1500
            })
        })
     }

    return (
        <>
            {loader}
            <form onSubmit={handleLogin}>
                <BaseInput name="email"  label="email" type="text" value={email} onChange={e => setEmail(e.target.value)}/>
                <BaseInput  label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)}/>

                <BaseButton className="btn btn-primary btn-sm"  label="Konekte" type="submit"/>
                <Link to="/passwordreset" className="back-link"><small>Ou bliye ModPas ou? </small></Link>
            </form>
        </>

    )
}
