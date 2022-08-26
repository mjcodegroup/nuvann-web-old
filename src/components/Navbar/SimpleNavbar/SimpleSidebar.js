import React from 'react'
import { Link } from 'react-router-dom'

import './styles.scss'

export const SimpleSidebar = () => {
    return (
        <div>
            <div className="simple__sidebar">
                <ul className="simple_sidebar_ul text-white">
                    <li>
                        <Link className="text-white" to="/#"> Jeneral </Link>
                    </li>
                    <li>
                        <Link className="text-white" to="/seller/product"> Pwodui </Link>
                    </li>
                    <li>
                        <Link className="text-white" to="/seller/product/order"> Demand </Link>
                    </li>
                    <li>
                        <Link className="text-white" to="/#"> Vant </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}