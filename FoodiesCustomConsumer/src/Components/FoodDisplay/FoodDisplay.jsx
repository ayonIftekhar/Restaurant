import { useContext } from "react";
import {FoodsContext} from '../../Context/Context'
import FoodItem from "../FoodItem/FoodItem";

function FoodDisplay({category , textField}){

    const {foods} = useContext(FoodsContext)
    const filteredFoods = foods.filter(
        (food) => (
            (food.category === category || category === 'All') && 
            food.name.toLowerCase().includes(textField.toLowerCase())
        )
    );
    // console.log(filteredFoods)
    
    return (
        <div className="container-flex ms-3 mt-5 me-3">
            <div className="row">
            {
                filteredFoods.length != 0 ? 
                    (
                        
                        filteredFoods.map( (item , index)=>{
                            return (
                                <div key={index} className="col-12 col-lg-3 col-md-4 col-sm-6 mb-4">
                                    <FoodItem id={item.id} price={item.price} category={item.category} description={item.description} imageUrl={item.imageURL} name={item.name} />
                                </div>
                                )
                            } ) 
                    )
                    :
                    <div className="d-flex flex-column justify-content-center align-items-center text-center p-5">
                        <i className="bi bi-emoji-frown fs-1 text-secondary mb-3"></i>
                        <h4 className="text-muted">Oops... Seems like we are not available right now</h4>
                    </div>
            }
            </div>
        </div>
    )
}

export default FoodDisplay; 