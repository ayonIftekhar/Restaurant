import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FoodsContext } from "../../Context/Context";

function Cart(){

    const navigate = useNavigate();

    const {foods , counts , increment ,decrement , resetCount} = useContext(FoodsContext);
    const filteredFoods = foods.filter((food)=>
        (counts[food.id] || 0) > 0
    );

    const shippingCharge = 80;
    const subTotal = filteredFoods.reduce( (acc,food)=>  acc+ food.price * (counts[food.id] || 0) , 0 );
    const vat = subTotal * 0.05 ;

    const total = subTotal + vat + shippingCharge ;


    return (
        <div className="container py-5">
            <h1 className="mb-5">Your Shopping Cart</h1>
            <div className="row">
                <div className="col-lg-8">
                    <div className="card mb-4">
                        <div className="card-body">
                            {
                                (filteredFoods.length > 0) ?
                                <>
                                {
                                    filteredFoods.map((food,id)=>(
                                        <div key={id}>
                                            <div className="row cart-item mb-3" >
                                                <div className="col-md-3">
                                                    <img src={food.imageURL} alt={food.name} className="img-fluid rounded"/>
                                                </div>
                                                <div className="col-md-5">
                                                    <h5 className="card-title">{food.name}</h5>
                                                    <p className="text-muted">Category: {food.category}</p>
                                                </div>
                                                <div className="col-md-2">
                                                    <div className="input-group">
                                                        <button className="btn btn-outline-secondary btn-sm" type="button" onClick={()=>decrement(food.id)}>-</button>
                                                        <input style={{"maxWidth ": "100px"}} type="text" className="form-control  form-control-sm text-center quantity-input" value={counts[food.id]} readOnly/>
                                                        <button className="btn btn-outline-secondary btn-sm" type="button" onClick={()=>increment(food.id)}>+</button>
                                                    </div>
                                                </div>
                                                <div className="col-md-2 text-end">
                                                    <p className="fw-bold">{counts[food.id] * food.price}</p>
                                                    <button className="btn btn-sm btn-outline-danger" onClick={()=> resetCount(food.id , 0)}>
                                                        <i className="bi bi-trash"></i>
                                                    </button>
                                                </div>
                                            </div>
                                            <hr />
                                        </div>
                                    ))
                                } 
                                </>
                                    :
                                <p className="text-center text-muted fs-5 py-5">
                                    Your cart is empty. Add some delicious items to get started! 🍽️
                                </p>

                            }
                        </div>
                    </div>
                    <div className="text-start mb-4">
                        <Link className="btn btn-outline-primary" to="/home">
                            <i className="bi bi-arrow-left me-2"></i>Continue Shopping
                        </Link>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="card cart-summary">
                        <div className="card-body">
                            <h5 className="card-title mb-4">Order Summary</h5>
                            <div className="d-flex justify-content-between mb-3">
                                <span>Subtotal</span>
                                <span>Tk.{subTotal}</span>
                            </div>
                            <div className="d-flex justify-content-between mb-3">
                                <span>Shipping</span>
                                <span>Tk.{filteredFoods.length>0? shippingCharge : 0}</span>
                            </div>
                            <div className="d-flex justify-content-between mb-3">
                                <span>VAT</span>
                                <span>Tk.{vat}</span>
                            </div>
                            <hr/>
                            <div className="d-flex justify-content-between mb-4">
                                <strong>Total</strong>
                                <strong>Tk.{filteredFoods.length>0? total : 0}</strong>
                            </div>
                            <button className="btn btn-primary w-100" disabled={filteredFoods.length === 0 } onClick={()=>navigate("/order")}>Proceed to Checkout</button>
                        </div>
                    </div>
                    
                    <div className="card mt-4">
                        <div className="card-body">
                            <h5 className="card-title mb-3">Apply Promo Code</h5>
                            <div className="input-group mb-1">
                                <input type="text" className="form-control" placeholder="Enter promo code" />
                                <button className="btn btn-outline-secondary" type="button">Apply</button>
                            </div>
                        </div>
                        <p className="text-muted fst-italic small mt-2 text-center">
                            No available promo codes right now .
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart;