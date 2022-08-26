import React, { useState } from 'react'
import { Link, useHistory} from 'react-router-dom'
import BaseInput from '../../../components/Base-Input/BaseInput'
import BaseButton from '../../../components/BaseButton/BaseButton';
import api from '../../../services/api';
import './styles.scss'


import {history} from '../../../history';
import Footer from '../../../components/Footer/Footer';

import Swal from 'sweetalert2/src/sweetalert2.js'

export default function ResetPassword() {
    const [email, setEmail] = useState('');

    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault()
        const data= {
            email
        }

       await  api.post('/sendLink', data)
            .then(resp => {
                console.log(data)

                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: `${resp.data.message}`,
                    showConfirmButton: false,
                    timer: 1500
                  })
                  history.push('/')
                
            }).catch(error=> {
                Swal.fire({
                    position: 'top-end',
                    icon: `error`,
                    title: `${error.error}`,
                    showConfirmButton: false,
                    timer: 1500
                  })
                // return;
            })
     }
    return (
        <div >
<div className="newsletter">
    <div className="container">
        <div className="col-sm-12">
            <div className="content">
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input type="email" className="form-control" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}/>
                        <span className="input-group-btn">
                        <button className="btn" type="submit">Klike pou w ka resevwa Lyen an</button>
                        </span>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

            
        </div>
    )
}
