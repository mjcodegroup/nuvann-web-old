import React, {useState, useEffect, useContext} from 'react'
import Swal from 'sweetalert2/src/sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'
import { useHistory} from 'react-router-dom'
// import {GrFormAdd} from 'react-icons/gr'


import api from '../../../../services/api'
import NewProductImageUpload from './NewProductImageUpload'
import { Context } from '../../../../contexts/auth'
import axios from 'axios'

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { FaTrashAlt } from 'react-icons/fa'
import { IoMdAdd } from 'react-icons/io'


const useStyles = makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
        borderRadius: '10px',
        width: '518px',
        height: '551px',
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      overflow:"auto",
    }
  }));


export default function NewProductForm() {
    const classes = useStyles();

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price,setPrice] = useState('')
    const [discount,setDiscount] = useState('')
    const [category, setCategory] = useState([''])
    const [subCategory, setSubCategory] = useState([''])

    const [selectedCategory, setSelectedCategory] = useState('0');
    const [selectedSubCategory, setSelectedSubCategory] = useState('0');

    const [selectedCategoryLabel, setSelectedCategoryLabel] = useState('');
    const [selectedSubCategoryLabel, setSelectedSubCategoryLabel] = useState('');
    
    const [firstImg, setFirstImg] = useState({ preview: "", raw: "" });
    const [secondImg, setSecondImg] = useState({ preview: "", raw: "" });
    const [thirdImg, setThirdImg] = useState({ preview: "", raw: "" });
    const { user } = useContext(Context);
    const history = useHistory();
    
    const [inputList, setInputList] = useState([{ productSize: "", productQuantity: "" }]);
    const [inputCorList, setInputCorList] = useState([{ productCor: "", productCorQuantity: "" }])

    const [width, setWidth] = useState('')
    const [height, setHeight] = useState('')
    const [length, setLength] = useState('')
    const [weight, setWeight] = useState('')

    const productQuantity = inputList.reduce(function(prev, cur) {
        return Number(prev) + Number(cur.productQuantity)
        // return prev + cur ;
    },0)
    const productCorQuantity = inputCorList.reduce(function(prev, cur) {
        return Number(prev) + Number(cur.productCorQuantity)
        // return prev + cur ;
    },0)

    const [amount, setAmount] = useState(productQuantity)
    useEffect(() => {
        async function getCategory() {
            try {
                    const response = await api.get('/category')
                    setCategory(response.data)
                } catch (error){
                    console.log(error)
                }
            }
            getCategory()
    }, [])
        
        const handleSelectCategory=( event)=> {
            const categoryNome =JSON.parse(event.target.value);
            setSelectedCategory(categoryNome)
            setSelectedCategoryLabel(categoryNome.name)
            getSubCategory(categoryNome.id)
        }
        const getSubCategory =async (id)=> {
            try {
                const result = await api.get(`subCategory/getByCategory?category_id=${id}`)
                if (result.data.message) {
                    setSubCategory([])
                }else {
                    setSubCategory(result.data)
                }
            } catch (error) {
                const err =error.response.data.message
                if(err) {
                    setSubCategory([]) 
                }
            }
        }
        const handleSelectSubCategory=( event)=> {
            const categoryNome =JSON.parse(event.target.value);
            setSelectedSubCategory(categoryNome)
            setSelectedCategoryLabel(categoryNome.name)
        }
        
        const handleFirstImg =async (e)=> {
            if (e.target.files.length) {
                setFirstImg({
                    preview: URL.createObjectURL(e.target.files[0]),
                    raw: e.target.files[0]
                });
                  
            }
        }
             
        const handleSecondImg =(e)=> {
            if (e.target.files.length) {
                setSecondImg({
                    preview: URL.createObjectURL(e.target.files[0]),
                    raw: e.target.files[0]
                });
            }
        }
        
        const handleThirdImg =(e)=> {
            if (e.target.files.length) {
                setThirdImg({
                    preview: URL.createObjectURL(e.target.files[0]),
                    raw: e.target.files[0]
                });
            }
        }

      async function handleSubmit(e){
        
            e.preventDefault()
            // const config = { headers: { 'Content-Type': 'multipart/form-data' } };        
            let formData = new FormData();

            const shipping_data = {
                width,
                height,
                length,
                weight
            }
            formData.append('img', firstImg.raw);
            formData.append('img2', secondImg.raw);
            formData.append('img3', thirdImg.raw);
            formData.append('name', name);
            formData.append('description',description);

            formData.append('price', price);
            formData.append('discount', discount);
            formData.append('amount', amount);
            formData.append('sub_category_id', selectedSubCategory.id);
            formData.append('userId',user.id)
            formData.append('size',JSON.stringify(inputList))
            formData.append('color',JSON.stringify(inputCorList))
            formData.append('shipping_data',JSON.stringify(shipping_data))
            let token = localStorage.getItem('access_token')

            
            const endpoint = 'https://nuvannapi.xyz/api/reseller/products';
            // const params = {
            //     mode:'no-cors',
            //     method: 'post',
            //     headers: {
            //         'Content-Type':false,
            //         'Authorization':'Bearer '+token 
            //     },
            //     dataType:'json',
            //     processData:false,
            //     body: formData  
            // }

            try{
                // const response = await fetch(endpoint,params);
                const response = await axios({
                    method: 'POST',
                    url: endpoint,
                    data: formData,
                    mode: 'no-cors',
                    headers:  {
                        'processData': false,
                        'Content-Type':false,
                        'Authorization':`Bearer ${JSON.parse(token)}` 
                    } 
                })
                const message= response.data.message
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: message,
                    showConfirmButton: false,
                    timer: 1500
                })
                history.push("/seller/product")

            }catch(error){
                console.log(error)
            }
    
        }

        const [open, setOpen] = React.useState(false);
        const [modalCor, setModalCor] = React.useState(false);

        const handleOpen = () => {
          setOpen(true);
        };
      
        const handleClose = () => {
            setAmount(productQuantity)
            setOpen(false);
        };

        
        const handleInputChange =(e, index)=> {
            const {name, value} = e.target
            const list = [...inputList]
            list[index][name] = value
            setInputList(list)
        }
        
        const handleAddInput =(e, index)=> {
            e.preventDefault()
            
            let position = localStorage.getItem('position')
            
            if(inputList[position].productQuantity && inputList[position].productSize){
                setInputList([...inputList, { productSize: "", productQuantity: "" }])
            }
            
        }
        const handleDeleteInput =(e, index)=> {
            const list = [...inputList]
            list.splice(index, 1)
            setInputList(list)
        }

        // cor
        
        const handleAddCor=()=>{
            setModalCor(true)
        }
        const handleCloseCor=()=>{
            setAmount(productCorQuantity)
            setModalCor(false)
        }

        const handleInputCorChange =(e, index)=> {
            const {name, value} = e.target
            const list = [...inputCorList]
            list[index][name] = value
            setInputCorList(list)
        }

        const handleAddCorInput =(e, index)=> {
            e.preventDefault()
            
            let position = localStorage.getItem('position')
            
            if(inputCorList[position].productCorQuantity && inputCorList[position].productCor){
                setInputCorList([...inputCorList, { productCor: "", productCorQuantity: "" }])
            }
            
        }
        const handleDeleteCorInput =(e, index)=> {
            const list = [...inputCorList]
            list.splice(index, 1)
            setInputCorList(list)
        }

        return (
        <>
            <form onSubmit={handleSubmit} encType="multipart/form-data" >
                <div className="seller__newProduct_grid">
                    <div className="left-grid">
                        <div className="form-row">
                            <div className="col-12 mb-3">
                                <label htmlFor="productName" className="form-label">Non Pwodui a * </label>
                                <input type="text" name="image" className="form-control" id="productName" value={name} onChange={e => setName(e.target.value)}/>
                            </div>
                            <div className="col-12 mb-3">
                                <label htmlFor="description" className="form-label">Deskripsyon Pwodui a * </label>
                                <textarea className="form-control" id="description" rows="3" value={description} onChange={e => setDescription(e.target.value)}></textarea>
                            </div>
                            
                        </div>
                        <div className="form-row">
                            <div className="col-3 mb-3">
                                <label htmlFor="productName" className="form-label">Pwa * </label>
                                <input type="text" name="image" className="form-control" id="productName" value={weight} onChange={e => setWeight(e.target.value)}/>
                            </div>
                            <div className="col-3 mb-3">
                                <label htmlFor="productName" className="form-label">Wotè * </label>
                                <input type="text" name="image" className="form-control" id="productName" value={height} onChange={e => setHeight(e.target.value)}/>
                            </div>
                            <div className="col-3 mb-3">
                                <label htmlFor="productName" className="form-label">Lajè * </label>
                                <input type="text" name="image" className="form-control" id="productName" value={width} onChange={e => setWidth(e.target.value)}/>
                            </div>
                            <div className="col-3 mb-3">
                                <label htmlFor="productName" className="form-label">Longè * </label>
                                <input type="text" name="image" className="form-control" id="productName" value={length} onChange={e => setLength(e.target.value)}/>
                            </div>
                            
                        </div>
                            <label htmlFor="">imaj *</label>
                        <div className="seller_newProduct_image_grid">
                            <NewProductImageUpload label="img1" id="img1"   onChange={handleFirstImg} preview={firstImg.preview}/>
                            <NewProductImageUpload label="img2" id="img2" onChange={handleSecondImg} preview={secondImg.preview}/>
                            <NewProductImageUpload label="img3" id="img3" onChange={handleThirdImg} preview={thirdImg.preview}/>
                        </div>

                        <button className="btn btn-success mt-5">Anrejistre</button>
                    </div>

                    <div className="right-grid">
                        <div className="form-row">
                            <div className="col-10 mb-3">
                                <label htmlFor="validationDefault04">Kategori * </label>
                                <select className="custom-select" value={selectedCategoryLabel.name} onChange={handleSelectCategory}>
                                    <option value="">chwazi yon kategory</option>                                  
                                    {category.map((cat, index)=> (
                                        <option value={JSON.stringify({ id: cat.id, slug: cat.slug, name: cat.name})} key={index}> {cat.name}</option>
                                    ))}
                                </select>
                            </div>
                            {selectedCategory.slug && 
                                <div className="col-10 mb-3">
                                    <label htmlFor="validationDefault04">Sou Kategori * </label>
                                    <select className="custom-select" value={selectedSubCategoryLabel.name} onChange={handleSelectSubCategory}>
                                        <option value="">chwazi yon sou kategory</option>
                                    
                                        {subCategory.map((cat, index)=> (
                                            <option value={JSON.stringify({ id: cat.id, slug: cat.slug, name: cat.name})} key={index}> {cat.name}</option>
                                        ))}
                                    </select>
                                </div>
                            }

                            {['AL','BO'].includes(selectedCategory.slug) ? '' :''}

                            {selectedCategory.slug === 'EN'? 
                                <div className="col-10 mb-3">
                                    <label htmlFor="validationDefault04">Koulè</label>
                                    {/* <button type="button" className="btn btn-block btn-primary" onClick={handleAddCor}> <span>+</span> </button> */}
                                    {amount ===0 
                                    ? 
                                        <button type="button" className="btn btn-block btn-primary" onClick={handleAddCor}> <IoMdAdd className="fa__mais" size={30}/> </button> 
                                    : 
                                    <button type="button" className="btn btn-block btn-primary" onClick={handleAddCor}> Modifye </button>
                                    }
                                </div>
                            : 
                            ''
                            }

                            {['VE', 'ES'].includes(selectedCategory.slug)? 
                                <>
                                <div className="col-10 mb-3">
                                        <label htmlFor="validationDefault04">Gwosè</label>
                                        {inputList[0].productQuantity === ''  ? <button type="button" className="btn btn-block btn-primary" onClick={handleOpen}> <IoMdAdd className="fa__mais" size={30}/> </button> : 
                                        <button type="button" className="btn btn-block btn-primary" onClick={handleOpen}> Modifye </button>
                                        }
                                    </div>
                                <div className="col-10 mb-3">
                                    <label htmlFor="validationDefault04">Koulè</label>
                                    {/* <button type="button" className="btn btn-block btn-primary" onClick={handleAddCor}> <span>+</span> </button> */}
                                    {inputCorList[0].productCorQuantity === ''? <button type="button" className="btn btn-block btn-primary" onClick={handleAddCor}> <IoMdAdd className="fa__mais" size={30}/> </button> : 
                                    <button type="button" className="btn btn-block btn-primary" onClick={handleAddCor}> Modifye </button>
                                    }
                                </div>
                                </>
                            : 
                            ''
                            }
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
                                                    
                                                    <div className="size__modal_form">
                                                    {inputList.map((x, i) => {
                                                        {localStorage.setItem('position',i)}

                                                        return (
                                                            <div className="box">
                                                                <div className="input__col">
                                                                    <div className="form-group">
                                                                        <label htmlFor="validationDefault04">Gwosè</label>
                                                                            <select name="productSize" value={inputList[i].productSize} className="custom-select" onChange={e =>handleInputChange(e, i)}>
                                                                                <option value={inputList.productSize} >chwazi yon Gwosè</option>                                  
                                                                                    <option value="PP">  XS | SP</option>
                                                                                    <option value="P"> P | S </option>
                                                                                    <option value="M">  M </option>
                                                                                    <option value="G">  G | L </option>
                                                                                    <option value="GG">  GG | XL </option>
                                                                                    <option value="XGG">  XGG | XXL </option>
                                                                            </select>
                                                                    </div>
                                                                    <div className="form-group">
                                                                        <label htmlFor="validationDefault04">Kantite</label>
                                                                            <input
                                                                                className="form-control"
                                                                                name="productQuantity"
                                                                                onChange={e =>handleInputChange(e, i)}
                                                                                value={inputList[i].productQuantity}
                                                                            />
                                                                        
                                                                    </div>
                                                                        {inputList.length !== 1 && <FaTrashAlt className="modalDeleteBtn" onClick={handleDeleteInput}/>}
                                                                </div>
                                                            </div>

                                                        )
                                                    })}
                                                    </div>
                                                    <div className="modal_footer_btn">
                                                    <button type="button" className="btn btn-small btn-primary" onClick={handleAddInput}>Ajoute Gwosè</button>
                                                        {/* <button className="btn btn-primary">Ajoute Gwosè</button> */}
                                                        {inputList[0].productQuantity !== '' && inputList[0].productSize !== '' ? 
                                                            <button className="btn btn-success" type="button" onClick={handleClose}>Anrejistre</button>
                                                            :
                                                            ''
                                                        }
                                                    </div>
                                           </div>
                                        </div>
                                    </Fade>
                                </Modal>
                            <Modal
                                open={modalCor}
                                onClose={handleCloseCor}
                                aria-labelledby="transition-modal-title"
                                aria-describedby="transition-modal-description"
                                className={classes.modal}
                                closeAfterTransition
                                BackdropComponent={Backdrop}
                                BackdropProps={{
                                timeout: 500,
                                }}
                            >
                                   <Fade in={modalCor}>
                                        <div className={classes.paper}>
                                           <div className="size__modal">
                                                    
                                                    <div className="size__modal_form">
                                                    {inputCorList.map((x, i) => {
                                                        {localStorage.setItem('position',i)}

                                                        return (
                                                            <div className="box">
                                                                <div className="input__col">
                                                                    <div className="form-group">
                                                                        <label htmlFor="validationDefault04">Koulè</label>
                                                                            <select name="productCor" value={inputCorList[i].productCor} className="custom-select"  onChange={e =>handleInputCorChange(e, i)}>
                                                                                <option value="" >chwazi yon koulè</option>                               
                                                                                <option value="red" >Wouj</option>                               
                                                                                <option value="black" >Nwa</option>                            
                                                                                <option value="white" >Blan</option>                          
                                                                                <option value="brown" >Mawon</option>                        
                                                                                <option value="gray" >Gri</option>                       
                                                                            </select>
                                                                    </div>
                                                                    <div className="form-group">
                                                                        <label htmlFor="validationDefault04">Kantite</label>
                                                                            <input
                                                                                className="form-control"
                                                                                name="productCorQuantity"
                                                                                onChange={e =>handleInputCorChange(e, i)}
                                                                                value={inputCorList[i].productCorQuantity}
                                                                            />
                                                                        
                                                                    </div>
                                                                        {inputCorList.length !== 1 && <FaTrashAlt className="modalDeleteBtn" onClick={handleDeleteCorInput}/>}
                                                                </div>
                                                            </div>

                                                        )
                                                    })}
                                                    </div>
                                                    <div className="modal_footer_btn">
                                                    <button type="button" className="btn btn-small btn-primary" onClick={handleAddCorInput}>Ajoute Koulèè</button>
                                                        {/* <button className="btn btn-primary">Ajoute Gwosè</button> */}
                                                        {inputCorList[0].productCorQuantity !=='' && inputCorList[0].productCor !== '' ? 
                                                            <button className="btn btn-success" type="button" onClick={handleCloseCor}>Anrejistre</button>
                                                            :
                                                            ''
                                                        }
                                                        
                                                    </div>
                                           </div>
                                        </div>
                                    </Fade>
                                </Modal>
                        </div>
                        <div className="form-row">
                            <div className="col-4 mb3">
                                <label htmlFor="price" className="form-label">Pri *</label>
                                <input type="number" className="form-control" value={price} onChange={e => setPrice(e.target.value)}/>
                            </div>
                            <div className="col-4 mb-3">
                                <label htmlFor="discount" className="form-label">Diskont</label>
                                <input type="number" className="form-control" id="discount" value={discount} onChange={e => setDiscount(e.target.value)} />
                            </div>
                        </div>
                        <div className="form-row">
                            {
                                ['AL' , 'BO' , 'ED' , 'EL', 'ELM' , 'NE' ,'ME'
                                 ,'JW' ,'LO' ,'VES','ELA', 'BI','LO', 'ENM','PK',]
                                .includes(selectedCategory.slug)?
                                <div className="col-10 mb3">
                                    <label htmlFor="amount" className="form-label">Kantite *</label>
                                    <input type="number" className="form-control" value={amount} onChange={e => setAmount(e.target.value)}/>
                                </div>
                            :

                            <div className="col-10 mb3">
                                <label htmlFor="amount" className="form-label">Kantite *</label>
                                <input readOnly type="number" className="form-control" value={amount} onChange={e => setAmount(e.target.value)}/>
                            </div>

                            }
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}
