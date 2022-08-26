import React from 'react'
import './styles.scss'
import {RiCloseFill} from 'react-icons/ri'

const Modal=({ id= 'modal', onClose=()=>{}, children})=> {


    const handleOutsideClick =(e) => {
        if (e.target.id === id) onClose()
    }

    return (
        <div id={id} className="__modal" onClick={handleOutsideClick}>
            <div className="__modal_container">
                <RiCloseFill className="modal__button_close" onClick={onClose} size="25"/>
                    {children}
            </div>
            
        </div>
    );
};

export default Modal;