import React, {useEffect} from 'react'
import api from '../../services/api'
import {useHistory} from 'react-router-dom'
import useFullPageLoader from '../../contexts/hooks/useFullPageLoader';


export const StrValidator = () => {
    const history = useHistory()
  const [loader, showLoader, hideLoader] =useFullPageLoader()

    useEffect(()=> {
        showLoader()
        const id = window.localStorage.getItem('strValidator')
        try {
            api.get(`http://nuvannapi.xyz/api/stripe/connected/retrieve?account_id=${id}`)
            .then(response => {
                history.push('/seller')
            })
        } catch(error) {
            console.log(error.response)

        }
        hideLoader()
    },[])
    return (
        <div>
            {loader}
        </div>
    )
}
