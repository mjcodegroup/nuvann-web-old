import React from 'react'
import { Link , useHistory} from 'react-router-dom';
import Title from '../../components/Title/Title';

import './styles.scss'

export default function CartTotal({getTotal,getCart, ErrorMessage}) {
    const history = useHistory();
    const handlePurchase = ()=> {
        localStorage.setItem('where', 'cart')
        history.push("/purchase")
    }
    return (
        <div className="left-card sticky-top pt-2"> 
            <Title title="Rezime" className="text-center"/>
            <div className="content">
                <div className="card__price-total-title">
                    <p>Total (<span> {getCart.length} Pwodui</span>)</p>
                    <p>{getTotal} $</p>
                </div>
                <hr/>
                <div className="card__price-total-title">
                    <p>Livrezon</p>
                    <p>00 $</p>
                </div>
                <hr/>
                <div className="card__price-total-title">
                    <p>Total</p>
                    <p>$ {getTotal}</p>
                </div>
                <Link to="/#" className="btn btn-block btn-primary"> Kontinye Achte</Link>
            {!ErrorMessage ?
            <>
                <button onClick={handlePurchase} className="btn btn-block btn-success"> Kontinye</button>
            </>
            :
            <>
                <button disabled onClick={handlePurchase} className="btn btn-block btn-success"> Kontinye</button>
            </>
            
            }

            </div>
        </div>
    )
}
