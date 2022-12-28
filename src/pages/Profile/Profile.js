// import Footer from '../../components/Footer/Footer'
import React, { useState, useEffect } from 'react'
import api from '../../services/api'
import Navbar from '../../components/Navbar/Navbar'
import {MdDelete} from 'react-icons/md'
import './styles.scss'

import card1 from '../../assets/Rectangle123.png'
import card2 from '../../assets/Rectangle126.png'
import Swal from 'sweetalert2'
import axios from 'axios'
import ProfileUpload from './ProfileUpload'

export default function  Profile(){
    const [ userProfile, setUserProfile ] = useState([])
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [CPF, setCPF] = useState('')
    const [phone, setPhone] = useState('')
    const [CEP, setCEP] = useState('')
    const [state, setState] = useState('')
    const [city, setCity] = useState('')
    const [neighborhood, setNeighborhood] = useState('')
    const [address, setAddress] = useState('')

    const [number, setNumber] = useState('')
    const [profile, setProfile] = useState('')

    const [apear, setApear] = useState('')
    const [apearU, setApearU] = useState('')
    const [firstImg, setFirstImg] = useState({ preview: "", raw: "" });

    useEffect(() => {
        const profileData = async()=> {
            try{
                const request = await api.get('users/me')
                localStorage.setItem('user',JSON.stringify(request.data))

                    setUserProfile(request.data)

                    setName(request.data.name)
                    setEmail(request.data.email)
                    setCPF(request.data.CPF)
                    getUserContact(request.data.contact);
                    getUserAdress(request.data.address);
                    setProfile(request.data.profile)
                }catch(error){
                    console.log(error)
                }
        }
        const getUserContact = function(product) {
            var _arr = [];
            
            for (var key in product) {
                _arr.push(product[key]);
            }
            setPhone(_arr[2])
            return _arr;
        }
        const getUserAdress = function(product) {
            var _arr = [];
            
            for (var key in product) {
                _arr.push(product[key]);
            }
            setCEP(_arr[1])
            setNumber(_arr[3])
            setState(_arr[6])
            setCity(_arr[5])
            setAddress(_arr[2])
            setNeighborhood(_arr[4])
            return _arr;
        }
     profileData();

// eslint-disable-next-line react-hooks/exhaustive-deps
    },[userProfile.name])
    
    let token = localStorage.getItem('access_token');


    const handleSubmit = async () => {
        
        let formData = new FormData();
        let contact = {
            phone: `${phone}`,
        }
        
        let setAddress = {
            address: `${address}`,
            CEP: `${CEP}`,
            state: `${state}`,
            number: `${number}`,
            neighborhood: `${neighborhood}`,
            city: `${city}`,
            
        }
        
        formData.append('id',userProfile.id);
        formData.append('CPF', CPF);
        formData.append('name', name);
        formData.append('email',email);
        formData.append('contact',JSON.stringify(contact));
        formData.append('address',JSON.stringify(setAddress));
        formData.append('email',email);
        formData.append('profile',apearU);
        
        const endpoint = 'https://nuvannapi.mjcodegroup.com/api/users/update';
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
            window.location.reload();
            
        }catch(e){
            console.log(e)
        }
        
    }
    
    const handleFirstImg =async (e)=> {
        if (e.target.files.length) {
            setFirstImg({
                preview: URL.createObjectURL(e.target.files[0]),
                raw: e.target.files[0]
            });
              
        }
    }

    useEffect(() => {
        if (firstImg.preview === ''){
             setApear(profile)
        } else {
         setApear(firstImg.preview)
         setApearU(firstImg.raw)
        }
 // eslint-disable-next-line react-hooks/exhaustive-deps
     },[apear, handleFirstImg])

    return (
        <>
            <Navbar />
            <div className="profile_part">
            <div className="personal_info">
            <div className="profile_pic"> 
                <ProfileUpload label="img1" id="img1"  onChange={handleFirstImg} preview={apear} img={profile}/>
            </div>

            <div className="info_pesonel">
                <h2>{name}</h2>

            <div className="email_info">
                <p>E-mail</p>
                <i>{email}</i>
            </div>
            <div className="cpf_info">
                <p>Cpf</p>
                <i>{CPF}</i>
            </div>
            <div className="telefon_info">
                <p>Telefòn</p>
                <i>{phone}</i>
            </div>
        </div>
        <div className="adres_info">
             <h1>Adrès</h1>
             <div className="cep_info">
                <p>CEP</p>
                <i>{CEP}</i>
            </div>
            <div className="eta_info">
                <p>Eta</p>
                <i>{state}</i>
            </div>
            <div className="vil_info">
                <p>Vil</p>
                <i>{city}</i>
            </div>
            <div className="nimewo_info">
                <p>Nimewo</p>
                <i>{number}</i>
            </div>
        </div>
        </div>
                <div className="adress_info">
                    <div className="first_part">
                        <p><strong>Enfo</strong> </p>
                        <form action="">
                            <div className="input_name">
                                <label htmlFor="">Nom konplè*:</label> 
                                <input type="text"   placeholder=" Damas Serius" value={name} onChange={e => setName(e.target.value)}/><br/>
                            </div>
                            <div  className="input_email">
                                <label htmlFor="">Email*:</label>
                                <input type="email" value={email} onChange={e => setEmail(e.target.value)}/><br/>
                            </div>
                            <div className="input_cpf">
                                <label htmlFor="">Cpf*:</label>
                                <input type="text"  value={CPF} onChange={e => setCPF(e.target.value)}/><br/>
                            </div>
                           <div className="input_telefon">
                                <label htmlFor="">Telefòn:</label>
                                <input type="text"  placeholder=" +55 49 985055224" value={phone} onChange={e => setPhone(e.target.value)}/><br/>
                           </div>
                        </form>
                    </div>
                    <div className="second_part">
                        <p><strong>Adrès</strong> </p>
                        <form action="">
                            <div className="input_cep">
                                <label htmlFor="">CEP:</label> 
                                <input type="text"   placeholder=" 80897086" value={CEP} onChange={e => setCEP(e.target.value)}/><br/>
                            </div>
                            <div className="input_eta">
                                <label htmlFor="">Eta:</label>
                                <input type="text"  value={state} onChange={e => setState(e.target.value)}/><br/>
                            </div>
                            <div className="input_katye">
                                <label htmlFor="">Katye:</label>
                                <input type="text"  value={neighborhood} onChange={e => setNeighborhood(e.target.value)}/><br/>
                            </div>
                            <div className="input_vil"> 
                                <label htmlFor="">Vil:</label>
                                <input type="text"value={city} onChange={e => setCity(e.target.value)}/><br/>
                            </div>
                            <div className="input_ri"> 
                                <label htmlFor="">Ri:</label>
                                <input type="text"value={address} onChange={e => setAddress(e.target.value)}/><br/>
                            </div>
                           <div className="input_nimewo"> 
                                <label htmlFor="">Nimewo:</label>
                                <input type="text"  placeholder=" nimewo_info" value={number} onChange={e => setNumber(e.target.value)}/><br/>
                           </div>
                        </form>
                        </div>
                        <div className="credit_cards">
                            <p>Katon</p>
                            <div className="first_credit_card">
                                <div className="card">
                                    <div className="img_card">
                                        <img src={card2} alt="" />
                                    </div>
                                    <p>5412*************</p>
                                </div>
                                <p className="mr-2"><MdDelete /> </p>
                            </div>
                            <div className="second_credit_card">
                                <div className="card">
                                    <div className="img_card">
                                        <img src={card1} alt="card" />
                                    </div>
                                    <div>
                                        <p >5412*************</p>
                                    </div>
                                </div>
                                <p className="mr-2"><MdDelete /> </p>
                            </div>
                            <button className="btn-anrejistre" onClick={handleSubmit}>Anrejistre</button>
                        </div>
                        
                       

                        
                    </div>
                </div>
            </>
    )
}
