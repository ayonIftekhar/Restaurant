import { useState } from "react";
import FoodDisplay from "../../Components/FoodDisplay/FoodDisplay";

function Explore(){
    const [textField , setTextField] = useState('');
    const [category , setCategory] = useState('All');
    return (
        <div>
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <form onSubmit={(e)=>e.preventDefault()}>
                            <div className="input-group mb-2">
                                <select className="form-select me-2 mt-2" style={{"maxWidth" : '150px'}} value={category} onChange={(e)=>setCategory(e.target.value)}>
                                    <option value="All">All</option>
                                    <option value="Pizza">Pizza</option>
                                    <option value="Burger">Burger</option>
                                    <option value="Momos">Momos</option>
                                    <option value="Biriyani">Biriyani</option>
                                    <option value="Cake">Cake</option>
                                </select>
                                <input className="form-control mt-2" type="text" placeholder="Search your favourite dish here..." value={textField} onChange={(e)=> setTextField(e.target.value)}></input>
                                <button className="btn btn-primary mt-2" type="submit">
                                    <i className="bi bi-search"></i>
                                </button>
                            </div>
                        </form>
                    </div> 
                </div>
            </div>
            <FoodDisplay category={category} textField={textField} />
        </div>
    )
}

export default Explore;