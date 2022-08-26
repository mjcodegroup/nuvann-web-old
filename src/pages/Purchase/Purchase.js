import React, {useContext} from 'react'
import Navbar from '../../components/Navbar/Navbar'
import './styles.scss'
import StepOne from './step/StepOne'
import StepTwo from './step/StepTwo'
import StepThree from './step/StepThree'

import {Stepper, StepLabel, Step} from '@material-ui/core'
import {multiStepContext} from '../../contexts/StepContext'
import { PurchaseResume } from './Resume/PurchaseResume'

// stripe
export const Purchase = () => {
    const {currentStep} = useContext(multiStepContext)
    function showStep(step) {
        switch(step) {
            case 1:
                return <StepOne />
            case 2:
                return(
                    <StepThree />
                    ) 
            default:
                <StepOne/>
        }
    }
    return (
        <>

        <Navbar />
        <div className="container purchase__container">
            <div className="purchase__wizard">

                <div>
                    <Stepper style={{width: '100%'}} activeStep={currentStep - 1} orientation="horizontal">
                        <Step >
                            <StepLabel></StepLabel>
                        </Step>
                        <Step >
                            <StepLabel></StepLabel>
                        </Step> 
                    </Stepper>
                </div>
                <div className="stepper-content">
                    {showStep(currentStep)}
                </div>
            </div>
            <div className="purchase_resume">
                <PurchaseResume />
            </div>
        </div>
        </>
    )
}
