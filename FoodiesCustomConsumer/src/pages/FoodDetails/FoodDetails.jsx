import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { FoodsContext } from "../../Context/Context";
import { getFoodById } from '../../FoodService/FoodService'
import { Link } from "react-router-dom";

function FoodDetails(){

    const {id} = useParams();
    const [food , setFood] = useState({});    

    async function fetchFood(){
        try {
            const response = await getFoodById(id);
            if( response.status === 200) setFood(response.data);
            else toast.warning("Failed to fetch details!")
        }
        catch(error) {
            toast.error("Internal Server Error!")
        }
    }

    useEffect( ()=>{
        fetchFood();
    } ,[])

    const {counts , resetCount} = useContext(FoodsContext);
    const [counter, setCounter] = useState(0)
    
    function isAuthorized() {
        return !!sessionStorage.getItem("jwt");
    }

    return(
        <section className="py-5">
            <div className="container px-4 px-lg-5 my-5">
                <div className="row gx-4 gx-lg-5 align-items-center">
                    <div className="col-md-6"><img className="card-img-top mb-5 mb-md-0" src={food.imageURL} alt="..." /></div>
                    <div className="col-md-6">
                        <div className="small mb-1">
                            Category : <span className="badge text-bg-warning">{food.category}</span>
                        </div>
                        <h1 className="display-5 fw-bolder">{food.name}</h1>
                        <div className="fs-5 mb-5">
                            <span className="text-decoration-line-through me-2">TK.45.00</span>
                            <span>Tk.{food.price}</span>
                        </div>
                        <p className="lead">{food.description}</p>
                        <div className="d-flex align-items-center">
                            <label htmlFor="inputQuantity" className="form-label me-3">Qunatity :</label>
                            <input className="form-control text-center me-3" id="inputQuantity" name="inputQuantity" style={{"maxWidth" : "3rem"}} onChange={(e)=>setCounter(e.target.value)} />
                            {
                                isAuthorized() ?
                                    <Link to="/home">
                                        <button className="btn btn-outline-dark flex-shrink-0" type="button" onClick={() => resetCount(id, counter)}>
                                            <i className="bi-cart-fill me-1"></i>
                                            Add to cart
                                        </button>
                                    </Link>
                                    :
                                    <button className="btn btn-outline-dark flex-shrink-0" type="button" onClick={() => toast.error("Log In to perform the operation!")}>
                                        <i className="bi-cart-fill me-1"></i>
                                        Add to cart
                                    </button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default FoodDetails;