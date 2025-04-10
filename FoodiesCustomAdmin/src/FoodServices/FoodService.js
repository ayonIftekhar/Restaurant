import axios from "axios";

const URL = 'http://localhost:8869/api/foods'

async function addFood ( foodDetails , image ){
    const formData = new FormData();
    //console.log(image);
    //console.log(image.type);
    formData.append('food' , JSON.stringify(foodDetails));
    formData.append( 'file' , image );
    const response = await axios.post( URL , formData , {headers : { "Content-Type" : "multipart/form-data" } })
    return response;
}

export async function getAllFoods(){
    const response = await axios.get(URL);
    return response;
}

export async function removeFood(id){
    const response = await axios.delete(URL+`/${id}`)
    return response;
}

export async function getOrders(){
    const response = axios.get('http://localhost:8869/api/all-orders')
    return response;
}


export default addFood;