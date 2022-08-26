import React, {useContext} from 'react'
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'
import { multiStepContext } from '../../../contexts/StepContext'


export default function StepTwo() {
    const {setStep} = useContext(multiStepContext)

    return (
        <div className="purchase__stepTwo">

            <div className="stepTwo_creditCard">
                <span>Credit & Debit Cards </span>
            </div>

            <div></div>

            <div></div>

            <span><BsChevronLeft size={30} onClick={()=>setStep(1)}/></span>
            <span><BsChevronRight size={30} onClick={()=>setStep(3)}/></span>
        </div>

    )
}
