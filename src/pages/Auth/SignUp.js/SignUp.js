import React,{useState} from 'react'

import BaseInput from '../../../components/Base-Input/BaseInput'
import BaseButton from '../../../components/BaseButton/BaseButton'

import api from '../../../services/api'
import {history} from '../../../history';

import Swal from 'sweetalert2/src/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
// import { CgChevronDoubleLeft } from 'react-icons/cg';
import useFullPageLoader from '../../../contexts/hooks/useFullPageLoader';

export default function SignUp() {
    const [name, setName]=useState('')
    const [email, setEmail]=useState('')
    const [password, setPassword]=useState('')

    const [loader, showLoader, hideLoader] =useFullPageLoader()
    

    async function handleSubmit(e){
        e.preventDefault()
        showLoader();

        const data={
            name,
            email,
            password
        }
          
        await  api.post('/users', data)
        .then(resp=>{
            const message = resp.data.message
                console.log(message)
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: message,
                    showConfirmButton: false,
                    timer: 30000
                })
                history.push('/')
                window.location.reload();
                hideLoader();
            })
            .catch(error=> {
                hideLoader();
                const message = error.response.data.message
                const code = error.response.data.code
                if (code===500){
                    Swal.fire({
                        position: 'top',
                        icon: 'error',
                        title: message,
                        showConfirmButton: false,
                        timer: 2000,
                        width: '28rem',
                        height: '25rem'
                    })
                }
            })
        

    }

    return (
        <>

            {loader}
            <form onSubmit={handleSubmit}>
                <BaseInput value={name} label="Name" type="text" onChange={e => setName(e.target.value)} />
                <BaseInput value={email} label="Email" type="text" onChange={e => setEmail(e.target.value)}/>
                <BaseInput  value={password} label="Password" type="password" onChange={e => setPassword(e.target.value)}/>

                <BaseButton className="btn btn-primary btn-sm"  label="Enskri" type="submit"/>
            </form>
        </>
    )
}
