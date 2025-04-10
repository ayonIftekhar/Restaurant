
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getAllFoods, removeFood } from "../../FoodServices/FoodService";
import './ListFood.css'

function ListFood() {

    const [ foods , setFoods] = useState([]);

    async function loadFoodList(){
        const response = await getAllFoods();
        if( response.status === 200 ){
            setFoods(response.data);
        }else{
            toast.error("Error Fetching List From Backend...")
        }
    }

    async function removeSelectedFood(id){
        const response = await removeFood(id);
        if( response.status === 200){
            toast.success("Food Removed successfully!")
            loadFoodList();
        }else {
            toast.error(" Removal of Food Failed! ")
        }
    }
    
    useEffect( ()=>{
        loadFoodList()
    }, [] )

    return (
        <div className="py-5 row justify-content-center">
            <div className="card col-12">  
                <table className="table">
                    <thead>
                        <tr>
                            <td>Image</td>
                            <td>Name</td>
                            <td>Category</td>
                            <td>Price</td>
                            <td>Action</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            foods.map( (item , index)=>{
                                return (
                                    <tr key={index}>
                                        <td>
                                            <img src={item.imageURL} alt="food image" height={48} width={48}></img>
                                        </td>
                                        <td> {item.name} </td>
                                        <td>{item.category}</td>
                                        <td>{item.price}</td>
                                        <td className="text-danger">
                                            <i className="bi bi-x-circle-fill" onClick={()=>removeSelectedFood(item.id)}></i>
                                        </td>
                                    </tr>
                                )
                            } )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ListFood;