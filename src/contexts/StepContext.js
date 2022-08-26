/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react'
import { Purchase } from '../pages/Purchase/Purchase';

export const multiStepContext = React.createContext();


const StepContext = () => {
    const [currentStep, setStep] = useState(1);
    const [userData, setUserData] = useState([]);
    const [finalData, setFinalData] = useState([]);
    const [userProfile, setUserProfile] = useState([])

    const [CEP, setCEP] = useState('')
    const [address, setAddress] = useState('')
    const [state, setState] = useState('')
    const [number, setNumber] = useState('')
    const [city, setCity] = useState('')
    const [CPF, setCPF] = useState('')
    const [name, setName] = useState('')
    
    async function submitData(e) {
        e.preventDefault()
        setFinalData(finalData=>[...finalData, userData])       
    }

    
    return (
        <div>
            <multiStepContext.Provider 
                value={{
                    currentStep,
                    setStep,
                    userData,
                    setUserData,
                    submitData,
                    finalData,
                    setFinalData,
                    CEP,setCEP,
                    address, setAddress,
                    state, setState,
                    city, setCity,
                    number, setNumber,
                    userProfile, setUserProfile,
                    CPF, setCPF,
                    name, setName
                }}
            >
                <Purchase />
            </multiStepContext.Provider>
            
        </div>
    )
}
export default StepContext;
