import React, {useEffect, useState} from 'react'
import { SimpleNavbar } from '../../../components/Navbar/SimpleNavbar/SimpleNavbar'
import { SimpleSidebar } from '../../../components/Navbar/SimpleNavbar/SimpleSidebar'
import { FaRegEye } from 'react-icons/fa'
import { FiEdit } from 'react-icons/fi'
import { RiDeleteBinLine } from 'react-icons/ri'
import { Link, useHistory } from 'react-router-dom'
import BaseSelect from '../../../components/Base-Select/BaseSelect'
import useFullPageLoader from '../../../contexts/hooks/useFullPageLoader';

import './styles.scss'

import api from '../../../services/api'
import Swal from 'sweetalert2'


import './styles.scss'
export default function Product() {
    const [products, setProducts] = useState([])
    const [info, setInfo] = useState([])
    const [notice, setNotice] = useState(false)
    const [loader, showLoader, hideLoader] =useFullPageLoader()
    const history = useHistory()


    useEffect(() => {
      try {
          api.get(`reseller/products`)
          .then(response => {
              const product = response.data
              setProducts(product)
          })
      } catch(error) {
          console.log(error)
      }
    },[])
    useEffect(()=> {
        try {
            api.get('users/me')
            .then(response => {
                setInfo(response.data)
            })
        } catch(error) {
            console.log(error.response)

        }
    },[])

    const handleDeleteProduct =async (id) => {
      try {
          const response = await api.post('products/delete', {id})
          const message = response.data.message
      Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: message,
          showConfirmButton: false,
          timer: 3000
      })
      // window.location.reload();
      } catch(error){
          const message = error.response
      Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: message,
          showConfirmButton: false,
          timer: 3000
      })
      }
    }

    const handleCreate = async ()=> {
        showLoader()
        try {
            const response = await api.post('stripe/connected', {
                account: {
                    type: 'standard',
                    country: 'BR',
                    email: info.email,
                    business_profile: {
                        support_email: info.email,
                        support_phone: info.contact.phone,
                        support_address: {
                            city: info.address.city,
                            country: 'BR',
                            line1: `${info.address.address}, ${info.address.number}`,
                            postal_code: info.address.CEP,
                            state: info.address.state
                        },
                    }
                },
                refresh_url: "http://localhost:3000/seller",
                return_url: "http://localhost:3000/seller/strvalidator"
            })

            if(response.status===200) {
                window.localStorage.setItem('strValidator', response.data.account_id)
                const targetUrl = response.data.url
                window.open(targetUrl, '_blank');
            }
        } catch (error) {
            console.log(error)
        }
        hideLoader()
    }

    const handleAdd = async () => {
        // 
        if(info.connect_account_status === "enabled") {
            history.push('/seller/product/new')
        } else {
            setNotice(true)
        }

    }


    return (
        <div>
            <SimpleNavbar />
            {loader}
                <div className="Seller__container">
                    {/* <Modal /> */}
                        <div className="">
                            <SimpleSidebar />
                        </div>
                            <div className="base__table container">
                                {!info.connect_account_id ?
                                <div className="stripe__connect_container">
                                    <div className="card stripe_connect text-center">
                                            <p>Kreye yon kont “<span>Stripe</span>” pou ka resevwa pèman ou yo!!</p>
                                            <button className="btn btn-outline-primary" onClick={handleCreate}>Kreye</button>  
                                    </div>
                                </div>
                                : 
                                <div>
                                    {notice ?
                                        <div className="alert alert-warning" role="alert">
                                            Svp, verifye kont Stripe ou an pouw ka resevwa Pèman yo vana w achte yon pwodui .. <Link to={{ pathname: "https://dashboard.stripe.com/settings/update" }} target="_blank" >Klike la</Link>
                                        </div>

                                    :
                                    ''
                                    }
                                    <div className="base__table_header">
                                        <div className="base__table_category">
                                        <BaseSelect />
                                        </div>
                                        <div className="base__table_button">
                                            <button className="btn btn-success" onClick={handleAdd}>Ajoute Pwodui</button>
                                        </div>
                                    </div>
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                            <th scope="col"></th>
                                            <th scope="col">Non</th>
                                            <th scope="col">Pri</th>
                                            <th scope="col">Kantite</th>
                                            <th scope="col">Aksyon</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {products.map((product, index)=>(
                                            <tr key={index}>
                                                <th scope="row"><FaRegEye /></th>
                                                <td>{product.name}</td>
                                                <td>{product.price}</td>
                                                <td>{product.amount}</td>
                                                <td> <FiEdit />  <RiDeleteBinLine onClick={() => handleDeleteProduct(product.id)}/> </td>
                                            </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                        }
                                </div>
                </div>
            
        </div>
    )
}
