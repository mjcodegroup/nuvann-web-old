import React, {useEffect, useState} from 'react'
import { SimpleNavbar } from '../../../components/Navbar/SimpleNavbar/SimpleNavbar'
import { SimpleSidebar } from '../../../components/Navbar/SimpleNavbar/SimpleSidebar'
import { FaRegEye } from 'react-icons/fa'
import { FiEdit } from 'react-icons/fi'
import { RiDeleteBinLine } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import BaseSelect from '../../../components/Base-Select/BaseSelect'
import './styles.scss'

import api from '../../../services/api'
import Swal from 'sweetalert2'

import './styles.scss'

export default function Order() {
    const [products, setProducts] = useState([])

    useEffect(() => {
      try {
          api.get(`reseller/orders`)
          .then(response => {
              const product = response.data
                if(product.message){
                    setProducts([])
                }else{
                    setProducts(product)
                }
          })
      } catch(error) {
          console.log(error)
      }
    },[])


    const handleDeleteProduct =async (id) => {
      try {
          const response = await api.post('products/delete', {id})
          console.log(response.data.message)
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
    return (
        <div>
            <SimpleNavbar />
            <div className="Sale__container">
                <div className="">
                    <SimpleSidebar />
                </div>
                <div className="base__table container">
            <div className="base__table_header">
                <div className="base__table_category">
                <BaseSelect />
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
                        <td>name</td>
                        <td>product</td>
                        <td>amount</td>
                        <td> <FiEdit />  <RiDeleteBinLine onClick={() => handleDeleteProduct(product.id)}/> </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>

                </div>
            </div>
    )
}
