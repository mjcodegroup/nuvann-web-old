import React, { useState, useParams } from 'react'
import BaseInput from '../../../components/Base-Input/BaseInput'
import BaseButton from '../../../components/BaseButton/BaseButton'
import api from '../../../services/api'

import {history} from '../../../history';


export default function PasswordConfirm() {
    const[confirm, setConfirm]= useState('')
    const[password, setPassword]= useState('')

    const {forgot} =useParams();

    async function handleSubmit(e) {
        e.preventDefault()
        const data= {
            forgot,
            password
        }

       await  api.post(`/resetPassword`, data)
            .then(resp => {

                console.log(data)
                history.push('/login')
                alert(resp.data.message)
                // window.location.reload()
                
            }).catch(error=> {
                alert(`${error} svp ranpli fòmilè an`)
                return;
            })
     }

    return (
    <div className="container">
           <form onSubmit={handleSubmit}>
               <BaseInput  label="Konfime Modpass" type="text" value={password}  onChange={e => setPassword(e.target.value)}/>
               <BaseInput label="Nouvo Modpass" value={confirm} onChange={e => setConfirm(e.target.value)}/>

               <BaseButton className="btn btn-primary" label="Konfime "/>
           </form>
        </div>
    )
}
