import React, { useState, useEffect} from 'react'
import ProfileUpload from './ProfileUpload'

const UserCard = ({name, email, cpf, phone, CEP, state, city, number, img}) => {
    const [apear, setApear] = useState('')
    const [firstImg, setFirstImg] = useState({ preview: "", raw: "" });


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
            setApear(img)
       } else {
        setApear(firstImg.preview)
       }
// eslint-disable-next-line react-hooks/exhaustive-deps
    },[apear, handleFirstImg])
 
    return (
        <div className="personal_info">
        <div className="profile_pic"> 
            <ProfileUpload label="img1" id="img1"  onChange={handleFirstImg} preview={apear} img={img}/>
        </div>

        <div className="info_pesonel">
            <h2>{name}</h2>

            <div className="email_info">
                <p>E-mail</p>
                <p>{email}</p>
            </div>
            <div className="cpf_info">
                <p>Cpf</p>
                <p>{cpf}</p>
            </div>
            <div className="telefon_info">
                <p>Telefòn</p>
                <p>{phone}</p>
            </div>
        </div>
        <div className="adres_info">
             <h1>Adrès</h1>
             <div className="cep_info">
                <p>CEP</p>
                <p>{CEP}</p>
            </div>
            <div className="eta_info">
                <p>Eta</p>
                <p>{state}</p>
            </div>
            <div className="vil_info">
                <p>Vil</p>
                <p>{city}</p>
            </div>
            <div className="nimewo_info">
                <p>Nimewo</p>
                <p>{number}</p>
            </div>
        </div>
        </div>
    
    )
}
export default UserCard;
