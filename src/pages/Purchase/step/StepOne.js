import React, {useContext, useState, useEffect} from 'react'
import { multiStepContext } from '../../../contexts/StepContext'
import TextField from '@material-ui/core/TextField';
import {BsChevronLeft, BsChevronRight} from 'react-icons/bs'
import './styles.scss'
import api from '../../../services/api';

export default function StepOne() {
    const {setStep,
            userProfile,setUserProfile ,
            CEP,setCEP,
            address, setAddress,
            state, setState,
            CPF, setCPF,
            city, setCity,
            number, setNumber
        } = useContext(multiStepContext)
    
        useEffect(() => {
            const profileData = async()=> {
                try{
                    const request = await api.get('users/me')
                        setUserProfile(request.data)
                        setCPF(request.data.CPF)
                        setCEP(request.data.address.CEP)
                        setAddress(request.data.address.address)
                        setCity(request.data.address.city)
                        setState(request.data.address.state)
                        setNumber(request.data.address.number)
                    }catch(error){
                        console.log(error)
                    }
            }
         profileData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
        },[userProfile.name])
    return (
        <div className="purchase__stepOne">
            <form>
                <div className="left">
                    <TextField id="standard-basic" label="CEP" value={CEP} onChange={(e)=>setCEP(e.target.value)}/>
                    <TextField id="standard-basic" label="Ri" value={address} onChange={(e)=>setAddress(e.target.value)}/>
                    <TextField id="standard-basic" label="Eta" value={state} onChange={(e)=>setState(e.target.value)}/>
                </div>

                <div className="right">
                    <TextField id="standard-basic" label="Nimero" value={number} onChange={(e)=>setNumber(e.target.value)}/>
                    <TextField id="standard-basic" label="Vil" value={city} onChange={(e)=>setCity(e.target.value)}/>
                </div>
            </form>
                <span><BsChevronLeft size={40} disabled/></span>
                <span><BsChevronRight size={40} onClick={()=>setStep(2)}/></span>
            {/* <button className="btn btn-primary">Next</button> */}
        </div>
    )
}
