import React, {useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import BaseInput from '../../../components/Base-Input/BaseInput'
import BaseButton from '../../../components/BaseButton/BaseButton'

import { Context } from '../../../contexts/auth'
import api from '../../../services/api'

import './styles.scss'

export const SellerPersonalInfo = () => {    
    const [cpf, setCpf] = useState('')
    const [birth, setBirth] = useState('')
    const [phone, setPhone] = useState('')
    const history = useHistory();
    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('user'))
        setCpf(userInfo.CPF)
        if (userInfo.contact){
            setPhone(userInfo.contact.phone)
            setBirth(userInfo.birthday)
        }
    }, [])

    

    const handleSubmit = async (e) => {
        let sellerArray =
            {
                CPF: cpf,
                birthday: birth,
                telephone: phone
            }
        localStorage.setItem('SellerInfo', JSON.stringify(sellerArray))
        history.push('/selleradress')
    }
    return (
        <div className="seller__info">
                <div className=" container __seller_section text-center">
                        <h5>Enfómasyon Adisyonèl</h5>
                    <div className="login__content text-center">
                        <form action="" onSubmit={handleSubmit}>
                            <BaseInput name="cpf"  label="Cpf" type="text" value={cpf} onChange={e => setCpf(e.target.value)}/>
                            <BaseInput name="birth"  label="birth" type="text" value={birth} onChange={e => setBirth(e.target.value)}/>
                            <BaseInput name="phone"  label="Telefòn" type="text" value={phone} onChange={e => setPhone(e.target.value)}/>

                            <BaseButton className=" btn btn-primary btn-sm" label="Kontinye" type="submit"/>
                        </form>
                    </div>
                </div>
        </div>
    )
}
