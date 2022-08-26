import AdminNav from '../../components/Navbar/AdminNav'
import React, {useEffect, useState} from 'react'
import { FaRegEye } from 'react-icons/fa'
import { FiEdit } from 'react-icons/fi'
import { RiDeleteBinLine } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import BaseSelect from '../../../../components/Base-Select/BaseSelect'
import Title from '../../../../components/Title/Title'

import api from '../../../../services/api'

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { FaTrashAlt } from 'react-icons/fa'
import { IoMdAdd } from 'react-icons/io'
import Swal from 'sweetalert2/src/sweetalert2'

import './styles.scss'


const useStyles = makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: '-99'
    },
    paper: {
        borderRadius: '10px',
        width: '462px',
        height: '318px',
        color: '#FFFFFF',
      backgroundColor: '#2A3652',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    }
  }));

export const SubCategory = () => {
    const classes = useStyles();
    const [products, setProducts] = useState([])
    const [open, setOpen] = React.useState(false);
    const [category, setCategory] = useState([''])
    const [selectedCategory, setSelectedCategory] = useState('0');
    const [selectedCategoryLabel, setSelectedCategoryLabel] = useState('');


    const [name,setName] = useState('')
    const [slug,setSlug] = useState('')


    useEffect(() => {
      try {
          api.get(`subCategory`)
          .then(response => {
              const product = response.data
              setProducts(product)
          })
      } catch(error) {
          console.log(error)
      }

      async function getCategory() {
        try {
                const response = await api.get('/category')
                setCategory(response.data)
            } catch (error){
                console.log(error)
            }
        }
        getCategory()
    },[setOpen])

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleSelectCategory=( event)=> {
        const categoryNome =JSON.parse(event.target.value);
        setSelectedCategory(categoryNome.id)
    }
    const handleSubmit =async()=> {
        const data = {
            product_category_id: selectedCategory,
            slug,
            name
        }
        if(name && slug) {
            try{
                const result = await api.post('subCategory', data)
                if (result.status ===200){
                const message = result.data.message
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: message,
                    showConfirmButton: false,
                    timer: 1500
                })
                    setOpen(false);
                    window.location.reload()
                }
            }catch(error) {
                setOpen(false);
                setName('')
                setSlug('')
                const message = error.response.data.message
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: message,
                    showConfirmButton: false,
                    timer: 1500
                })
            }
           
        }
    }

    return (
        <>
        <AdminNav >
        <div className="table__category base container ">
            <div className="base__table_header">
                <div className="base__table_category d-flex">
                    <Title title="Soucategory" className="text-white tit"/>
                    <button className="btn subcategoribtn" onClick={handleOpen}>Add Subcategory</button>
                </div>
            </div>
            <table className="table mw-auto">
                <thead>
                    <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Sou kategpry</th>
                    <th scope="col">kategpry</th>
                    <th scope="col">Slug</th>
                    <th scope="col">Aksyon</th>
                    </tr>
                </thead>
                <tbody>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        className={classes.modal}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                        timeout: 500,
                        }}
                    >
                        <Fade in={open}>
                            <div className={classes.paper}>
                                <div className="size__modal">
                                    <div className="">
                                        <form >
                                            <label htmlFor="validationDefault04">Kategori * </label>
                                            <select className="custom-select" value={selectedCategoryLabel.name} onChange={handleSelectCategory}>
                                                <option value="">chwazi yon kategory</option>                                  
                                                {category.map((cat, index)=> (
                                                    <option value={JSON.stringify({ id: cat.id, slug: cat.slug, name: cat.name})} key={index}> {cat.name}</option>
                                                ))}
                                            </select>
                                            <div className="form-group">
                                                <label htmlFor="exampleInputEmail1">Name</label>
                                                <input value ={name} type="text" className="form-control" onChange={e => setName(e.target.value)}/>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="exampleInputPassword1">Slug</label>
                                                <input type="text" value={slug} className="form-control" onChange={e => setSlug(e.target.value)}/>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="modal_footer_btn">
                                        <button type="button" className="btn btn-small btn-success" onClick={handleSubmit}>Save</button>
                                    </div>
                                </div>
                            </div>
                        </Fade>
                    </Modal>
                {products.map((subCategory, index)=>(
                    <tr key={index}>
                        <td>{subCategory.id}</td>
                        <td>{subCategory.name}</td>
                        <td>{subCategory.category.name}</td>
                        <td>{subCategory.slug}</td>
                        <td><RiDeleteBinLine/> </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
          
        </AdminNav>

            
        </>
    )
}
