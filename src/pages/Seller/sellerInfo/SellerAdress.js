import React, {useState, useContext, useEffect} from 'react'
import BaseInput from '../../../components/Base-Input/BaseInput'
import BaseButton from '../../../components/BaseButton/BaseButton'
import api from '../../../services/api'

import { Context} from '../../../contexts/auth'

import {useHistory} from 'react-router-dom'



import './styles.scss'
import Swal from 'sweetalert2'

export const SellerAdress = () => {    
    const [CEP, setCEP] = useState('')
    const [address, setAddress] = useState('')
    const [number, setNumber] = useState('')
    const [neighborhood, setNeighborhood] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [term, setTerm]= useState('')
    const newVal = term === true ? 'Y': 'N'

    const { user } = useContext(Context);

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('user'))
        if(userInfo.address){
            setCEP(userInfo.address.CEP)
            setAddress(userInfo.address.address)
            setNumber(userInfo.address.number)
            setNeighborhood(userInfo.address.neighborhood)
            setCity(userInfo.address.city)
            setState(userInfo.address.state)
        }
    }, [])


  const history = useHistory();

    
    const getCep = async() => {
        try {
            const response = await api.get(`address/cep/${CEP}`)
            const data = response.data.address
            setCity(data.localidade)
            setNeighborhood(data.bairro)
            setState(data.uf)
            setAddress(data.logradouro)
        }
        catch (error) {
            console.log(error)
        }
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        const getSellerInfo =localStorage.getItem('SellerInfo')
        const sellerInfo = JSON.parse(getSellerInfo)
        const addressArray = {
            id: user.id,
            CPF: sellerInfo.CPF,
            birthday: sellerInfo.birthday,
            term: newVal,
            contact: {
                phone: sellerInfo.telephone,
            },
            address: {
                address,
                CEP,
                number,
                neighborhood,
                city,
                state
            },
        }
        
        // const data = Object.assign({}, sellerInfo, addressArray)
        try {
            const response = await api.post(`users/update`, addressArray)
            const message = response.data.message
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: message,
                showConfirmButton: false,
                timer: 3000
            })
          history.push('/seller')

        } catch( error ) {
            const message = error.response.data.message
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: message,
                showConfirmButton: false,
                timer: 3000
            })
        }

    }
    return (
        <div className="seller__info">
                <div className=" container __seller_section text-center">
                        <h5>Adrès</h5>
                    <div className="login__content text-center">
                        <form action="" onSubmit={handleSubmit}>
                            <BaseInput name="CEP"  label="Cep" type="text" value={CEP} onChange={e => setCEP(e.target.value)} onBlur={getCep}/>
                            <BaseInput name="numero"  label="Nimewo" type="text" value={number} onChange={e => setNumber(e.target.value)}/>
                            <BaseInput name="adress"  label="Ri" type="text" value={address} onChange={e => setAddress(e.target.value)}/>
                            <BaseInput name="neighborhood"  label="Katye" type="text" value={neighborhood} onChange={e => setNeighborhood(e.target.value)}/>
                            <BaseInput name="city"  label="Vil" type="text" value={city} onChange={e => setCity(e.target.value)}/>
                            <BaseInput name="state"  label="Eta" type="text" value={state} onChange={e => setState(e.target.value)}/>
                            <div className="form-check">
                                <label className="form-check-label" htmlFor="flexCheckIndeterminate">
                                    <input className="form-check-input" type="checkbox" checked={term} onChange={e => setTerm(e.target.checked)} required/>
                                    Tèm ak kondisyon
                                </label>
                            </div>
                            <BaseButton className=" btn btn-primary btn-sm" label="Kontinye" type="submit"/>
                        </form>
                    </div>
                </div>
        </div>
    )
}
