import React, {useState} from 'react'
import Loading from '../../components/Loader/Loading'

export default function useFullPageLoader() {
    const [loading, setLoading] = useState(false)
    return [
            loading ? <Loading /> : null,
            ()=> setLoading(true),
            ()=> setLoading(false)
    ]
}
