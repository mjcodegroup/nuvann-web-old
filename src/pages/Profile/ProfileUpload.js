import React from 'react'
import SellerUploagImag from '../../assets/sellerUpload.png'

export default function ProfileUpload({label, id, onChange, preview, img}) {
    return (
        <div className="profil__image_upload">
            <label htmlFor={label}>
                {preview ? (
                <img src={preview} alt="dummy" width="100%" height="100%" />
                ) : (
                    <>
                    <img src={SellerUploagImag} alt="sellerUpload"/>
                    {/* <h5 className="text-center" style={{ visibility: "hidden" }} widtd="100%">Upload your photo</h5> */}
                    </>
                )}
            </label>
            <input
                name="upload_file"
                // accept="image/*"
                type="file"
                id={id}
                style={{ display: "none" }}
                onChange={onChange}
            />
            <br />
            {/* <button onClick={handleUpload}>Upload</button> */}
        </div>
    )
}