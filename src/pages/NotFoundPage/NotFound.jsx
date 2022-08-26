import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import {Link} from 'react-router-dom'

export const NotFound = () => {
    return (
        <div>
            <Navbar />
            <div className="text-center">
                <br /><br /> <br /><br />
                
                <p className="text-center text-danger"> Page Not Found</p>
                <Link to="/#" className="btn btn-primary">  Paj Prensipal </Link>

            </div>
        </div>
    )
}
