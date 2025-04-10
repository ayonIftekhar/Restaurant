import './FoodItem.css'
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { FoodsContext } from '../../Context/Context';
import { toast } from 'react-toastify';

function FoodItem( {id, price , category ,description , imageUrl , name} ){
    
    const { counts, increment, decrement } = useContext(FoodsContext);
    
    function isLoggedIn() {
        return !!sessionStorage.getItem("jwt");
    }

    return(
            <div className="card h-10 mb-4 me-1" style= {{"maxWidth" : "320px" }}>
                <Link to={`/details/${id}`}><img src={imageUrl} className="card-img-top" alt="Product Image" height={200}/></Link>
                <div className="card-body">
                        <h5 className="card-title">{name}</h5>
                        <p className="card-text truncate-2-lines">{description}</p>
                        <div className="d-flex align-items-center mb-3">
                            <span className="me-2 fw-semibold">Category:</span>
                            <span className="text-muted">{category}</span>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                            <span className="h5 mb-0">Tk. {price}</span>
                        <div>
                            <i className="bi bi-star-fill text-warning"></i>
                            <i className="bi bi-star-fill text-warning"></i>
                            <i className="bi bi-star-fill text-warning"></i>
                            <i className="bi bi-star-fill text-warning"></i>
                            <i className="bi bi-star-half text-warning"></i>
                            <small className="text-muted">(4.5)</small>
                        </div>
                    </div>
                </div>
                <div className="card-footer d-flex justify-content-between bg-light">
                    <Link className="btn btn-primary btn-sm" to={`/details/${id}`}>View More</Link>
                {
                    
                    isLoggedIn() ? 
                        ((counts[id] || 0) <= 0) ? 
                            <button className="btn btn-outline-primary btn-sm" onClick={()=>increment(id)}><i className="bi bi-plus-circle"></i></button> 
                        :
                            <div className="d-flex align-items-center gap-2">
                                <button className="btn btn-outline-primary btn-sm" onClick={()=>decrement(id)}>
                                <i className="bi bi-dash-circle"></i>
                                </button>
                            
                                <span className="px-3 py-1 border rounded bg-light">{counts[id] || 0}</span>
                            
                                <button className="btn btn-outline-primary btn-sm" onClick={()=>increment(id)}>
                                <i className="bi bi-plus-circle"></i>
                                </button>
                            </div>
                    :
                        <>
                            <button className="btn btn-outline-primary btn-sm" onClick={()=>toast.error("LogIn to Perform this operation!")}><i className="bi bi-plus-circle"></i></button>
                        </>    
                      
                }
                </div>
            </div>
    )
}

export default FoodItem;